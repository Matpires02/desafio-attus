package com.matpires.login_cookie.controller;

import com.matpires.login_cookie.dto.LoginRequestDto;
import com.matpires.login_cookie.dto.UserDto;
import com.matpires.login_cookie.service.AuthService;
import com.matpires.login_cookie.service.CurrentUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    private final AuthService service;
    private final CurrentUserService currentUserService;

    public AuthController(AuthService service, CurrentUserService currentUserService) {
        this.service = service;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request,
                                   HttpServletResponse response) {
        log.info("Request Login: {}", request.getEmail());

        String token = service.login(request);


        return ResponseEntity.ok(Map.of(
                "token", token,
                "message", "Login successful"
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response, HttpServletRequest request) {
        log.info("Request Logout: {}", currentUserService.getEmail());

        SecurityContextHolder.clearContext();

        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> me() {
        log.info("Request Get logged user: {}", currentUserService.getEmail());
        return ResponseEntity.ok(currentUserService.getUserDTO());
    }
}
