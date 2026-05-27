package com.matpires.login_cookie.service;

import com.matpires.login_cookie.dto.RegisterRequestDto;
import com.matpires.login_cookie.dto.UpdateUserDto;
import com.matpires.login_cookie.dto.UserDto;
import com.matpires.login_cookie.entity.Role;
import com.matpires.login_cookie.entity.User;
import com.matpires.login_cookie.enums.RoleName;
import com.matpires.login_cookie.exceptions.EmailAlreadyUsedException;
import com.matpires.login_cookie.exceptions.UserNotFoundException;
import com.matpires.login_cookie.mapper.UserMapper;
import com.matpires.login_cookie.repository.RoleRepository;
import com.matpires.login_cookie.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public void register(RegisterRequestDto dto) {
        log.debug("Registering user {}", dto.getEmail());
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        Set<Role> roles;

        if (dto.getRoles() == null || dto.getRoles().isEmpty()) {
            roles = Set.of(
                    roleRepository.findByName(RoleName.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Role USER não encontrada"))
            );
        } else {
            roles = dto.getRoles().stream()
                    .map(roleStr -> roleRepository.findByName(RoleName.valueOf(roleStr))
                            .orElseThrow(() -> new RuntimeException("Role não encontrada: " + roleStr)))
                    .collect(Collectors.toSet());
            roles.add(roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role USER não encontrada")));
        }

        user.setRoles(roles);
        user.setActivated(true);

        userRepository.save(user);
    }

    public UserDto update(UpdateUserDto dto) {
        log.debug("Updating user {}", dto.getEmail());
        User user = userRepository.findById(dto.getId()).orElseThrow(UserNotFoundException::new);

        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            var roles = dto.getRoles().stream()
                    .map(roleStr -> roleRepository.findByName(RoleName.valueOf(roleStr))
                            .orElseThrow(() -> new RuntimeException("Role não encontrada: " + roleStr)))
                    .collect(Collectors.toSet());
            roles.add(roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role USER não encontrada")));

            user.setRoles(roles);
        }

        if (dto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        if (dto.getActivated() != null) {
            user.setActivated(dto.getActivated());
        }

        if (dto.getEmail() != null) {
            if (userRepository.existsByEmailAndIdIsNot(dto.getEmail(), user.getId())) {
                throw new EmailAlreadyUsedException();
            }
            user.setEmail(dto.getEmail());
        }

        User saved = userRepository.save(user);

        log.debug("User {} updated", saved.getEmail());
        return userMapper.toDTO(saved);

    }

    public UserDto findById(UUID id) {
        log.debug("Finding user {}", id);
        return userRepository.findById(id).map(userMapper::toDTO).orElseThrow(UserNotFoundException::new);
    }

    public void deleteUser(UUID id) {
        log.debug("Deleting user {}", id);
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return;
        }
        throw new UserNotFoundException();
    }
}
