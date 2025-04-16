package com.chobby.backend.repository;

import com.chobby.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // メールアドレスでユーザーを検索するメソッド（Optionalを使用）
    Optional<User> findByEmail(String email);
}
