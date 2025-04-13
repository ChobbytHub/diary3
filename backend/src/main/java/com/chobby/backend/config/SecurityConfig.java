package com.chobby.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

    // SecurityFilterChainの設定（HTTPセキュリティ設定）
    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // リクエストの認可設定
        http.authorizeHttpRequests(authz -> authz
                // 静的リソース（CSS、JS、画像など）は全てのユーザーにアクセスを許可
                .requestMatchers("/css/**", "/js/**", "/img/**").permitAll()

                // ホームページ（/）へのアクセスは全てのユーザーに許可
                .requestMatchers("/").permitAll()

                // 新規登録画面（GETリクエスト）へのアクセスは全てのユーザーに許可
                .requestMatchers("/signup").permitAll()

                // 新規登録の送信（POSTリクエスト）へのアクセスは全てのユーザーに許可
                .requestMatchers("/signup/submit").permitAll()

                // 上記以外の全てのリクエストは認証が必要
                .anyRequest().authenticated()
        )
        // フォームログインの設定
        .formLogin(login -> login
                // ログインページのURL（未認証のユーザーがリダイレクトされるページ）
                .loginPage("/login")
                // ログイン処理用のURL
                .loginProcessingUrl("/login")
                // ログイン失敗時のリダイレクト先
                .failureUrl("/?error=true")
                // ログイン成功後のリダイレクト先（/home）
                .defaultSuccessUrl("/home", true)
                // ログインフォームのユーザーIDのパラメータ名
                .usernameParameter("userID")
                // ログインフォームのパスワードのパラメータ名
                .passwordParameter("password")
        )
        // ログアウトの設定
        .logout(logout -> logout
                // ログアウト時のリクエストマッチャ（/logout）
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                // ログアウト成功後のリダイレクト先
                .logoutSuccessUrl("/")
                // ログアウト時にHTTPセッションを無効化
                .invalidateHttpSession(true)
                // ログアウト時にJSESSIONIDクッキーを削除
                .deleteCookies("JSESSIONID")
        );

        // 設定が完了したらSecurityFilterChainを返す
        return http.build();
    }

    // パスワードエンコーダーのBean（BCryptを使用）
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCryptアルゴリズムを使用してパスワードをエンコード
    }
}
