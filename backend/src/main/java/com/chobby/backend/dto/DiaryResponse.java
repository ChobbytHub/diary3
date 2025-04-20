package com.chobby.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

/**
 * 日記1行分のレスポンス用 DTO
 */
@Getter
@AllArgsConstructor
public class DiaryResponse {

    private Long id;                 // 日記の行ID
    private LocalDate diaryDate;     // 日付
    private Integer lineNumber;      // 行番号（1〜3）
    private String text;             // 本文
}
