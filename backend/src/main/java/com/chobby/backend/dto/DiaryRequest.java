package com.chobby.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

/**
 * 日記1行分の作成・更新リクエスト用 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaryRequest {

    /** 日記対象日（省略時は Service 側で today に置き換える） */
    private LocalDate diaryDate;

    /** 行番号（1〜3） */
    @NotNull(message = "行番号を指定してください（1〜3）")
    @Min(value = 1, message = "行番号は1以上である必要があります")
    @Max(value = 3, message = "行番号は3以下である必要があります")
    private Integer lineNumber;

    /** 本文（必須、最大200文字） */
    @NotBlank(message = "本文を入力してください")
    @Size(max = 200, message = "本文は200文字以内で入力してください")
    private String text;
}
