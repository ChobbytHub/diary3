package com.chobby.backend.service;

import com.chobby.backend.entity.User;

import java.util.Optional;

public interface UserService {
    // ユーザーを保存する
    User saveUser(User user);

    // IDでユーザーを取得する
    Optional<User> findUserById(Long id);

    // メールアドレスでユーザーを取得する
    Optional<User> findUserByEmail(String email);

    // ユーザーを削除する
    void deleteUser(Long id);
}
