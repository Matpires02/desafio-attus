package com.matpires.login_cookie.controller;

import com.matpires.login_cookie.dto.UpdateUserDto;
import com.matpires.login_cookie.dto.UserDto;
import com.matpires.login_cookie.service.UserQueryService;
import com.matpires.login_cookie.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@Slf4j
public class AdminController {

    private final UserService userService;
    private final UserQueryService userQueryService;

    public AdminController(UserService userService, UserQueryService userQueryService) {
        this.userService = userService;
        this.userQueryService = userQueryService;
    }

    @PutMapping("/user/update")
    public ResponseEntity<UserDto> adminUpdate(@RequestBody @Valid UpdateUserDto dto) {
        log.debug("Request Updating user {}", dto.getEmail());
        return ResponseEntity.ok(userService.update(dto));
    }

    @GetMapping("/user/list")
    public ResponseEntity<Page<UserDto>> listUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        log.debug("Request Listing users");
        return ResponseEntity.ok(userQueryService.findAll(PageRequest.of(page, size)));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> findById(
            @PathVariable UUID id
    ) {
        log.debug("Request Finding user {}", id);
        return ResponseEntity.ok(userService.findById(id));
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable UUID id
    ) {
        log.debug("Request Deleting user {}", id);
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
