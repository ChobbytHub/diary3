package com.chobby.backend.controller;

import com.chobby.backend.dto.JwtResponse;
import com.chobby.backend.dto.LoginRequest;
import com.chobby.backend.dto.SignupRequest;
import com.chobby.backend.exception.ErrorResponse;
import com.chobby.backend.entity.User;
import com.chobby.backend.security.JwtUtil;
import com.chobby.backend.service.UserService;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * 認証関連のエンドポイントを提供するコントローラー。
 * ・POST /auth/signup   : 新規ユーザー登録
 * ・POST /auth/login    : ログイン(JWT発行)
 * ・POST /auth/logout   : ログアウト
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            UserService userService
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    /**
     * 新規ユーザー登録。
     * ・重複チェック後、UserService.saveUser でハッシュ化＋保存
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        // 重複チェック
        Optional<User> exists = userService.findUserByEmail(request.getEmail());
        if (exists.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(
                            400,
                            "Bad Request",
                            "このメールアドレスは既に登録されています。",
                            LocalDateTime.now()
                    ));
        }

        // ログで確認
        logger.info("リクエスト情報確認 - メールアドレス: {}", request.getEmail());
        logger.info("リクエスト情報確認 - 生パスワード: {}", request.getPassword()); // パスワードはクリアテキストなので、注意して使う

        // エンティティ作成 & サービスで保存
        User user = new User();
        user.setEmail(request.getEmail());
        user.setRawPassword(request.getPassword());  // 生パスワードをセット

        // ログで確認
        logger.info("ユーザー登録確認 - メールアドレス: {}", user.getEmail());
        logger.info("ユーザー登録確認 - 生パスワード: {}", user.getRawPassword()); // パスワードはクリアテキストなので、注意して使う


        try {
            userService.saveUser(user);
            logger.info("新規ユーザー登録成功: {}", request.getEmail());
            return ResponseEntity.ok("ユーザー登録が完了しました。");
        } catch (Exception e) {
            logger.error("ユーザー登録処理中に例外: {}", e.getMessage(), e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(
                            500,
                            "Internal Server Error",
                            "ユーザー登録中に予期しないエラーが発生しました。",
                            LocalDateTime.now()
                    ));
        }
    }

    /**
     * ログイン処理。
     * ・AuthenticationManager で認証後、JWT 発行
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword());
            Authentication auth = authenticationManager.authenticate(authToken);

            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            String jwt = jwtUtil.generateToken(userDetails.getUsername());
            logger.info("ログイン成功: {}", req.getEmail());
            return ResponseEntity.ok(new JwtResponse(jwt));
        } catch (AuthenticationException ex) {
            logger.warn("ログイン失敗: {} - {}", req.getEmail(), ex.getMessage());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(
                            401,
                            "Unauthorized",
                            "メールアドレスまたはパスワードが正しくありません。",
                            LocalDateTime.now()
                    ));
        }
    }

    /**
     * ログアウト処理。
     * ・SecurityContext をクリアし 204 を返却
     */
    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout() {
        SecurityContextHolder.clearContext();
        logger.info("ログアウト処理が実行されました。");
    }
}
