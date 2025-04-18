package com.chobby.backend.controller;

import com.chobby.backend.entity.User;
import com.chobby.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * ユーザーに関連する処理を担当するコントローラークラス。
 * ユーザーの登録を行うエンドポイントを提供。
 */
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 現在認証されているユーザーのアカウント削除を行うエンドポイント。
     *
     * @param user 認証済みユーザー
     * @return アカウント削除成功レスポンス
     */
    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMyAccount(@AuthenticationPrincipal User user) {
        userService.deleteUser(user.getId());  // ユーザー削除処理
    }
}
