package com.chobby.backend.controller;

import com.chobby.backend.dto.JwtResponse;
import com.chobby.backend.dto.LoginRequest;
import com.chobby.backend.exception.ErrorResponse;
import com.chobby.backend.security.JwtUtil;
import com.chobby.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

/**
 * 認証関連の処理をまとめたコントローラー。
 * <ul>
 *   <li>POST /auth/login    : ログイン (JWT発行)</li>
 *   <li>POST /auth/logout   : ログアウト (SecurityContextをクリア)</li>
 * </ul>
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    /**
     * ログイン処理。
     * 認証成功時にJWTトークンを返却する。
     *
     * @param req LoginRequest(email, password)
     * @return JWTトークン or 401 Unauthorized
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            // 認証用トークンを作成
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword());

            // 認証実行
            Authentication auth = authenticationManager.authenticate(token);

            // 認証成功 → JWTを生成
            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            String jwt = jwtUtil.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new JwtResponse(jwt));
        } catch (AuthenticationException ex) {
            logger.warn("Login failed for '{}': {}", req.getEmail(), ex.getMessage());
            // 統一エラーハンドリングに乗せたい場合は例外を投げてもOK
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(
                        401,
                        "Unauthorized",
                        "メールアドレスまたはパスワードが正しくありません",
                        java.time.LocalDateTime.now()
                    ));
        }
    }

    /**
     * ログアウト処理。
     * SecurityContext をクリアし、204 No Content を返す。
     * クライアント側では JWT を破棄してください。
     */
    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout() {
        SecurityContextHolder.clearContext();  // セキュリティコンテキストをクリア
    }
}
