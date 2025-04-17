package com.chobby.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 📓 ユーザーの日記を表すエンティティ
 */
@Entity
@Table(name = "diaries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Diary {

    // 🆔 日記ID（自動採番）
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 👤 対応するユーザー（N:1）
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    // 📅 日記の日付（ユーザーが指定、0時過ぎ対策として）
    @Column(name = "diary_date", nullable = false)
    private LocalDate diaryDate;

    // ✍️ 今日一番失敗したこと
    @Column(name = "line1")
    private String line1;

    // ✨ 今日一番感動したこと
    @Column(name = "line2")
    private String line2;

    // 🎯 明日の目標
    @Column(name = "line3")
    private String line3;

    // 🕒 作成日時（自動設定）
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // 📝 更新日時（更新のたびに自動設定）
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // 🔄 登録前処理（初期の作成/更新日時を設定）
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // 🔄 更新前処理（更新日時を更新）
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
