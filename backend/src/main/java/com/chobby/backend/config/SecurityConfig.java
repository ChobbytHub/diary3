package com.chobby.backend.config;

import com.chobby.backend.security.AuthorizationFilter;
import com.chobby.backend.security.JwtAuthenticationFilter;
import com.chobby.backend.security.JwtUtil;
import com.chobby.backend.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Spring Securityのセキュリティ設定クラス。
 * - ログイン（認証）処理
 * - アクセス制限（認可）処理
 * - JWTの認証フィルターの設定
 * - CORS設定の追加（フロントエンドとバックエンドが異なるドメインで動作する場合に必要）
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    /**
     * パスワードの暗号化に使うエンコーダー（BCrypt）。
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Springが内部で使用するAuthenticationManagerを取得。
     */
    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * 実際にDBのユーザー情報で認証を行うためのプロバイダーを定義。
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService); // DBからユーザー情報を取得
        provider.setPasswordEncoder(passwordEncoder());     // パスワードの照合にBCryptを使用
        return provider;
    }

    /**
     * CORS設定を定義。
     * - Reactなど別ドメインからのリクエストを許可するために必要。
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://chobbythub.github.io", "http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setExposedHeaders(Arrays.asList("Authorization")); // ヘッダーにAuthorizationを露出させる
        configuration.setAllowCredentials(true); // 必要なら true

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * アプリ全体のセキュリティ設定（フィルターチェーン）を構築。
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
        // 認証用フィルター（ユーザー名とパスワードでログイン → JWTを発行）
        JwtAuthenticationFilter authFilter = new JwtAuthenticationFilter(authManager, jwtUtil);
        authFilter.setFilterProcessesUrl("/login");

        // 認可用フィルター（リクエストに含まれるJWTを検証してアクセス制御）
        AuthorizationFilter authorizationFilter = new AuthorizationFilter(jwtUtil, userDetailsService);

        http
            .csrf(csrf -> csrf.disable())  // REST APIではCSRF不要
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS設定を有効にする
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // CORSのOPTIONSリクエストは許可
                .requestMatchers("/auth/login", "/auth/signup").permitAll() // "/login"は認証不要
                .requestMatchers("/health").permitAll() // ヘルスチェックは認証不要
                .anyRequest().authenticated()          // その他は認証が必要
            )
            .authenticationProvider(authenticationProvider()) // 認証プロバイダーを設定
            .addFilter(authFilter)                            // 認証用フィルターを追加
            .addFilterBefore(authorizationFilter, JwtAuthenticationFilter.class); // 認可用フィルターを追加

        return http.build();
    }
}
