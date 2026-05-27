package com.matpires.login_cookie.service;

import com.matpires.login_cookie.dto.UserDto;
import com.matpires.login_cookie.mapper.UserMapper;
import com.matpires.login_cookie.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserQueryService {
    private final UserRepository repository;
    private final UserMapper mapper;

    public UserQueryService(
            UserRepository repository,
            UserMapper mapper
    ) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public Page<UserDto> findAll(Pageable pageable) {
        log.debug("Finding all users pageable: {}", pageable);
        return repository.findAll(pageable)
                .map(mapper::toDTO);
    }
}
