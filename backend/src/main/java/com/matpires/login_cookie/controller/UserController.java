package com.matpires.login_cookie.controller;

import com.matpires.login_cookie.dto.RegisterRequestDto;
import com.matpires.login_cookie.dto.UpdateUserDto;
import com.matpires.login_cookie.dto.UserDto;
import com.matpires.login_cookie.exceptions.InvalidCredentialsException;
import com.matpires.login_cookie.service.CurrentUserService;
import com.matpires.login_cookie.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
    private final UserService userService;
    private final CurrentUserService currentUserService;

    public UserController(UserService userService, CurrentUserService currentUserService) {
        this.userService = userService;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterRequestDto dto) {
        log.info("Request Registering user {}", dto.getEmail());
        userService.register(dto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> update(@RequestBody @Valid UpdateUserDto dto) {
        log.info("Request Updating user {}", dto.getEmail());
        if (!dto.getId().equals(currentUserService.getUserId())) {
            log.error("User {} try update another user {}", currentUserService.getEmail(), dto.getEmail());
            throw new InvalidCredentialsException();
        }

        UserDto update = userService.update(dto);

        return ResponseEntity.ok(update);
    }
}
