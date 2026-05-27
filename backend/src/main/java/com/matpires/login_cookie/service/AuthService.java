package com.matpires.login_cookie.service;

import com.matpires.login_cookie.dto.LoginRequestDto;
import com.matpires.login_cookie.entity.User;
import com.matpires.login_cookie.exceptions.InvalidCredentialsException;
import com.matpires.login_cookie.repository.UserRepository;
import com.matpires.login_cookie.security.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository userRepository,
                       JwtService jwtService,
                       PasswordEncoder encoder
    ) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.encoder = encoder;
    }

    public String login(LoginRequestDto request) {
        log.info("Entering Login method: {}", request.getEmail());
        User user = userRepository.findByEmailAndActivatedTrue(request.getEmail())
                .orElseThrow(InvalidCredentialsException::new);

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        return jwtService.generateAccessToken(user);
    }
}
