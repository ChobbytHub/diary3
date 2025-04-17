package com.chobby.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * ログインリクエスト用 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotEmpty(message = "メールアドレスを入力してください")
    @Email(message = "正しいメールアドレス形式で入力してください")
    private String email;

    @NotEmpty(message = "パスワードを入力してください")
    private String password;
}
