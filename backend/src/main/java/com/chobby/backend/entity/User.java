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
import java.util.List;
import java.util.ArrayList;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 👤 ユーザー情報を保持するエンティティ（UserDetailsを実装）
 */
@Entity
@Table(name = "users") // "user" はSQLの予約語のため "users" を使用
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

    // 🔐 平文パスワード（一時的に使用、DBには保存しない）
    @Transient
    private String rawPassword;

    // 🔐 ハッシュ化されたパスワード（DBに保存）
    @Column(nullable = false)
    private String passwordHash;

    // 🕒 登録日時（初回保存時に自動設定）
    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    // 📓 ユーザーに紐づく日記一覧（1対多のリレーション）
    // - mappedBy: Diaryエンティティ側の"user"フィールドにマッピング
    // - cascade: ユーザー削除時に関連する日記も一括削除
    // - orphanRemoval: Userから切り離された日記を自動削除
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Diary> diaries = new ArrayList<>();

    // 🔄 登録前に作成日時を設定
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    // -------------------------------
    // 🔐 UserDetails インタフェース実装
    // -------------------------------

    // 🎫 ユーザーの権限（今回は未使用のため空）
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    // 🔐 認証に使用するパスワード
    @Override
    public String getPassword() {
        return this.passwordHash;
    }

    // 👤 認証に使用するユーザー名（今回はメールアドレス）
    @Override
    public String getUsername() {
        return this.email;
    }

    // ✅ アカウントの有効期限（常に有効）
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // ✅ アカウントのロック状態（常にロックされていない）
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // ✅ 資格情報の有効期限（常に有効）
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // ✅ アカウントの有効状態（常に有効）
    @Override
    public boolean isEnabled() {
        return true;
    }
}
