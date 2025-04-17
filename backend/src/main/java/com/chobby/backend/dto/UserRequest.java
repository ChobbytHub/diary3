package com.chobby.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ユーザー登録リクエストのDTOクラス。
 * メールアドレスとパスワードのバリデーションを行う。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    @NotBlank(message = "メールアドレスを入力してください")
    @Email(message = "有効なメールアドレス形式で入力してください")
    private String email;

    @NotBlank(message = "パスワードを入力してください")
    @Size(min = 6, message = "パスワードは6文字以上で入力してください")
    private String password;
}
