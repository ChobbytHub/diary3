package com.chobby.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 📓 ユーザーの日記の1行を表すエンティティ
 */
@Entity
@Table(
    name = "diaries",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "diary_date", "line_number"})
    }
)
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

    // 📅 日記の日付
    @Column(name = "diary_date", nullable = false)
    private LocalDate diaryDate;

    // 🔢 行番号（1〜3） 1:✍️ 今日一番失敗したこと 2:✨ 今日一番感動したこと 3:🎯 明日の目標
    @Column(name = "line_number", nullable = false)
    private Integer lineNumber;

    // ✍️ 日記の本文
    @Column(name = "text", nullable = false)
    private String text;

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
