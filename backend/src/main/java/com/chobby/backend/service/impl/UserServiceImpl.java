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
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * 新規登録・更新時に呼ばれるメソッド。
     * ・DTOから受け取った生パスワードを BCrypt でハッシュ化してセット
     * ・password フィールドは永続化しないため null に
     */
    @Override
    public User saveUser(User user) {
        if (user.getRawPassword() != null && !user.getRawPassword().trim().isEmpty()) {
            String hashed = passwordEncoder.encode(user.getRawPassword());
            user.setPasswordHash(hashed);
        }
        user.setRawPassword(null);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
