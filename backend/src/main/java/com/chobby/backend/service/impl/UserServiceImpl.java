package com.chobby.backend.service.impl;

import com.chobby.backend.entity.User;
import com.chobby.backend.repository.UserRepository;
import com.chobby.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // コンストラクタインジェクションでリポジトリを注入
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ユーザーを新規登録または更新
    @Override
    public User saveUser(User user) {
        // save() は新規作成・更新の両方に対応
        return userRepository.save(user);
    }

    // ユーザーIDで検索
    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    // メールアドレスでユーザーを検索（ログイン時などに使用）
    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ユーザーIDで削除
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
