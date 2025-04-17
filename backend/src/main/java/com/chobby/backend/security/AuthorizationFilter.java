package com.chobby.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

/**
 * 認可フィルター：JWTトークンを検証し、認証済みユーザーをSpring Securityのコンテキストに設定する。
 *
 * このクラスは全てのHTTPリクエストに対して一度だけ実行されます（OncePerRequestFilter）。
 */
public class AuthorizationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(AuthorizationFilter.class);

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public AuthorizationFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // CORSプリフライトリクエスト（OPTIONS）は処理せずにOKを返す
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // Authorizationヘッダーを取得
        String authHeader = request.getHeader("Authorization");

        // "Bearer " で始まるトークンがある場合のみ処理
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Objects.requireNonNull で非nullを保証し、IDEの警告を防止
            String header = Objects.requireNonNull(authHeader);
            String token = header.substring("Bearer ".length());  // トークン本体を抽出

            try {
                // トークンの有効性チェック
                if (jwtUtil.isTokenValid(token)) {
                    // トークンからユーザー識別子（email）を抽出
                    String email = jwtUtil.extractEmail(token);

                    // 未認証状態かつemailが取得できた場合のみ認証情報を設定
                    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );
                        authentication.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );

                        // 認証コンテキストに設定
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        logger.debug("Authenticated user: {}", email);
                    }
                } else {
                    // 無効なトークンの場合はクリア
                    logger.warn("Invalid JWT token received.");
                    SecurityContextHolder.clearContext();
                }
            } catch (Exception e) {
                // 解析中に例外が発生した場合はクリアしてログ出力
                logger.error("JWT authentication failed: {}", e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }

        // 認証の有無に関わらず次の処理へ
        filterChain.doFilter(request, response);
    }
}
