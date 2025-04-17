package com.chobby.backend.service.impl;

import com.chobby.backend.entity.User;
import com.chobby.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    // コンストラクタインジェクションでUserRepositoryを注入
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // loadUserByUsernameメソッドでユーザーをメールアドレスで検索
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // メールアドレスでユーザーを検索
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        // 見つかった場合はUserオブジェクトを返す
        return user;
    }
}
