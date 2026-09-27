package com.fraud.detection.service;

import com.fraud.detection.dto.LoginRequest;
import com.fraud.detection.dto.LoginResponse;
import com.fraud.detection.entity.User;
import com.fraud.detection.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse authenticate(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String dummyToken = "demo-token-" + user.getUsername() + "-" + System.currentTimeMillis();
                return new LoginResponse(user.getUsername(), user.getRole(), dummyToken, "Login successful");
            }
        }
        throw new IllegalArgumentException("Invalid username or password");
    }
}
