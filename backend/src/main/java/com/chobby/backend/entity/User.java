package com.chobby.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 👤 ユーザー情報を保持するエンティティ（UserDetailsを実装）
 */
@Entity
@Table(name = "users") // "user" は予約語なので避ける
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    // 🆔 ユーザーID（自動採番）
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 📧 メールアドレス（ログインIDとして使用）
    @Column(nullable = false, unique = true)
    private String email;

    // 🔐 平文パスワード（一時的に使用、DBに保存しない）
    @Transient
    private String password;

    // 🔐 ハッシュ化されたパスワード（DBに保存）
    @Column(nullable = false)
    private String passwordHash;

    // 🕒 登録日時
    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    // 🔄 登録前に作成日時を設定
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    // -------------------------------
    // 🔐 UserDetails 実装部分
    // -------------------------------

    // 🎫 権限（現状未使用）
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    // 🔐 Spring Security に渡すパスワード
    @Override
    public String getPassword() {
        return this.passwordHash;
    }

    // 👤 Spring Security に渡すユーザー名（メールアドレス）
    @Override
    public String getUsername() {
        return this.email;
    }

    // ✅ 常に有効なアカウント（期限なし）
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // ✅ 常にロックされていない
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // ✅ 資格情報（パスワード）は常に有効
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // ✅ アカウントは常に有効
    @Override
    public boolean isEnabled() {
        return true;
    }
}
