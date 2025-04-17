package com.chobby.backend.repository;

import com.chobby.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // email でユーザーを検索するメソッド（Spring Security用）
    Optional<User> findByEmail(String email);

    // email が既に存在するかを確認するメソッド（ユーザー登録時に使う）
    boolean existsByEmail(String email);
}
