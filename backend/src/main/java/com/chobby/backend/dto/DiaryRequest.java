package com.chobby.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

/**
 * 日記作成・更新リクエスト用 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaryRequest {

    /** 日記対象日（省略時は Service 側で today に置き換える） */
    private LocalDate diaryDate;

    /** 今日一番失敗したこと（必須） */
    @NotBlank(message = "1行目を入力してください")
    private String line1;

    /** 今日一番感動したこと（必須） */
    @NotBlank(message = "2行目を入力してください")
    private String line2;

    /** 明日の目標（必須） */
    @NotBlank(message = "3行目を入力してください")
    private String line3;
}
