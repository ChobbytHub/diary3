package com.chobby.backend.config;

import com.chobby.backend.security.AuthorizationFilter;
import com.chobby.backend.security.JwtAuthenticationFilter;
import com.chobby.backend.security.JwtUtil;
import com.chobby.backend.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Securityのセキュリティ設定クラス。
 * - ログイン（認証）処理
 * - アクセス制限（認可）処理
 * - JWTの認証フィルターの設定
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    /**
     * コンストラクタで必要な依存を注入。
     * - JWTユーティリティ
     * - ユーザー情報を提供するサービス
     */
    public SecurityConfig(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    /**
     * パスワードの暗号化に使うエンコーダー（BCrypt）。
     * - ユーザー登録やログイン時のパスワードを安全に処理できるようにする。
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Springが内部で使用するAuthenticationManagerを取得。
     * - ログイン処理時に必要なコンポーネント。
     */
    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * 実際にDBのユーザー情報で認証を行うためのプロバイダーを定義。
     * - UserDetailsServiceを通してユーザー情報を取得。
     * - BCryptでパスワード照合を行う。
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService); // DBからユーザー情報を取得
        provider.setPasswordEncoder(passwordEncoder());     // パスワードの照合にBCryptを使用
        return provider;
    }

    /**
     * アプリ全体のセキュリティ設定（フィルターチェーン）を構築。
     * - 認証（ログイン処理）
     * - 認可（アクセス制御）
     * - JWTによるトークン認証
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
        // 認証用フィルター（ユーザー名とパスワードでログイン → JWTを発行）
        JwtAuthenticationFilter authFilter = new JwtAuthenticationFilter(authManager, jwtUtil);
        authFilter.setFilterProcessesUrl("/login"); // ログイン用のエンドポイントを"/login"に設定

        // 認可用フィルター（リクエストに含まれるJWTを検証してアクセス制御）
        AuthorizationFilter authorizationFilter = new AuthorizationFilter(jwtUtil, userDetailsService);

        // 実際のセキュリティルールの定義
        http
            // REST APIでCSRFは不要なため無効化
            .csrf(csrf -> csrf.disable())
            // アクセス制御の設定
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login").permitAll() // "/login"は誰でもアクセスOK（認証不要）
                .anyRequest().authenticated()          // それ以外はすべて認証が必要
            )
            // 認証プロバイダーの設定（UserDetailsService + PasswordEncoder）
            .authenticationProvider(authenticationProvider())
            // 認証用のJWTフィルターを追加（ログイン時にJWTを発行）
            .addFilter(authFilter)
            // 認可用のJWTフィルターを追加（リクエストごとにJWTを検証）
            .addFilterBefore(authorizationFilter, JwtAuthenticationFilter.class);

        return http.build(); // 設定をビルドして返す
    }
}
