package com.matpires.login_cookie.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class UpdateUserDto {

    @NotNull
    private UUID id;

    @Email
    private String email;

    private String password;

    private Set<String> roles;

    private Boolean activated;
}
