package com.chobby.backend.service.impl;

import com.chobby.backend.entity.User;
import com.chobby.backend.repository.UserRepository;
import com.chobby.backend.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // PasswordEncoderを注入

    // コンストラクタインジェクションでリポジトリとPasswordEncoderを注入
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ユーザーを新規登録または更新
    @Override
    public User saveUser(User user) {
        // パスワードをハッシュ化して passwordHash に設定
        String encodedPassword = passwordEncoder.encode(user.getPassword()); // パスワードをエンコード
        user.setPasswordHash(encodedPassword); // ハッシュ化されたパスワードを設定
        user.setPassword(null); // 元のpasswordフィールドをnullに設定（オプション）
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
