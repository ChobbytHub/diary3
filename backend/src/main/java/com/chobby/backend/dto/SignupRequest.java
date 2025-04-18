package com.chobby.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {

    @NotEmpty(message = "メールアドレスは必須です")
    @Email
    private String email;

    @NotEmpty(message = "パスワードは必須です")
    private String password;
}
