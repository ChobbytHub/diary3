package com.chobby.backend.security;

import com.chobby.backend.dto.LoginRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * JWT認証フィルター
 *
 * UsernamePasswordAuthenticationFilterを拡張し、
 * ログインリクエストを受け取って認証し、
 * 成功時にJWTトークンを発行します。
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    /** Spring Securityの認証マネージャ */
    private final AuthenticationManager authenticationManager;

    /** JWTトークンを生成・検証するユーティリティ */
    private final JwtUtil jwtUtil;

    /**
     * コンストラクタ
     *
     * @param authenticationManager Spring Securityの認証マネージャ
     * @param jwtUtil JWTユーティリティクラス
     */
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;

        // デフォルトのログインURLを /login に設定
        setFilterProcessesUrl("/login");
    }

    /**
     * 認証処理の実装
     *
     * リクエストボディのJSONをLoginRequest DTOにマッピングし、
     * バリデーション後に認証マネージャへ認証トークンを渡します。
     *
     * @return 認証情報(Authentication) 成功時は認証済みトークン、失敗時は例外またはnull
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        try {
            // JSONリクエストをLoginRequestクラスに読み込む
            LoginRequest loginRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), LoginRequest.class);

            // バリデータを取得してDTOのバリデーションを実行
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();
            var violations = validator.validate(loginRequest);

            // バリデーションエラーがある場合
            if (!violations.isEmpty()) {
                // 400 Bad Requestを返却
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.setContentType("application/json");

                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "入力値が不正です");
                new ObjectMapper().writeValue(response.getOutputStream(), errorResponse);

                // 認証処理を中断
                return null;
            }

            // 認証用トークンを生成 (principal=email, credentials=password)
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    );

            // 認証処理を実行して結果を返す
            return authenticationManager.authenticate(authToken);

        } catch (IOException e) {
            // JSON読み取り失敗時はRuntimeExceptionとしてラップ
            throw new RuntimeException("ログイン情報の読み取りに失敗しました", e);
        }
    }

    /**
     * 認証成功時の処理
     *
     * 認証に成功したらJWTトークンを生成して、
     * JSONレスポンスとしてクライアントに返却します。
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException {

        // 認証結果からユーザー名（email）を取得
        String email = authResult.getName();

        // JWTトークンを生成
        String token = jwtUtil.generateToken(email);

        // レスポンス用JSONマップを用意
        Map<String, String> tokenResponse = new HashMap<>();
        tokenResponse.put("token", token);

        // JSONとして返却
        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getOutputStream(), tokenResponse);
    }

    /**
     * 認証失敗時の処理
     *
     * 認証に失敗した場合は401 Unauthorizedを返却します。
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) throws IOException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "メールアドレスまたはパスワードが正しくありません");

        new ObjectMapper().writeValue(response.getOutputStream(), errorResponse);
    }
}
