package com.chobby.backend.controller;

import com.chobby.backend.dto.UserRequest;
import com.chobby.backend.dto.UserResponse;
import com.chobby.backend.entity.User;
import com.chobby.backend.repository.UserRepository;
import com.chobby.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;

/**
 * ユーザーに関連する処理を担当するコントローラークラス。
 * ユーザーの登録を行うエンドポイントを提供。
 */
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, UserService userService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * ユーザー登録処理を行うエンドポイント。
     *
     * @param userRequest バリデーション付きユーザー情報
     * @return 登録結果レスポンス
     */
    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody UserRequest userRequest) {
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new UserResponse("このメールアドレスは既に登録されています"));
        }

        User newUser = new User();
        newUser.setEmail(userRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new UserResponse("ユーザー登録が完了しました"));
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
