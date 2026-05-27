package com.matpires.login_cookie.dto;

import com.matpires.login_cookie.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

/**
 * DTO for {@link User}
 */
public record UserDto(UUID id,
                      @NotNull(message = "E-mail requerido") @Email(message = "E-mail inválido") @NotEmpty(message = "E-mail requerido") @NotBlank(message = "E-mail requerido") String email,
                      Boolean activated, Set<String> roles) implements Serializable {
}