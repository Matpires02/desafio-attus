package com.matpires.login_cookie.service;

import com.matpires.login_cookie.dto.UserDto;
import com.matpires.login_cookie.entity.User;
import com.matpires.login_cookie.mapper.UserMapper;
import com.matpires.login_cookie.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class CurrentUserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public CurrentUserService(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    public User getUser() {
        log.debug("Getting user from security context");
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail((String) auth.getPrincipal()).orElse(null);
    }

    public UserDto getUserDTO() {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail((String) auth.getPrincipal()).map(userMapper::toDTO).orElse(null);
    }

    public UUID getUserId() {
        log.debug("Getting user id from security context");
        return getUser().getId();
    }

    public String getEmail() {
        log.debug("Getting user email from security context");
        return getUser().getEmail();
    }
}
