package com.chobby.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

/**
 * 日記のレスポンス用 DTO
 */
@Getter
@AllArgsConstructor
public class DiaryResponse {

    private Long id;
    private LocalDate diaryDate;
    private String line1;
    private String line2;
    private String line3;
}
