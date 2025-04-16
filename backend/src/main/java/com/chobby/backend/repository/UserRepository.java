package com.chobby.backend.repository;

import com.chobby.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // メールアドレスでユーザーを検索するメソッドを追加
    User findByEmail(String email);
}
