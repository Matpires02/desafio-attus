package com.matpires.login_cookie.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;

@Getter
@Setter
@ToString
public class RegisterRequestDto {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @ToString.Exclude
    private String password;

    private Set<String> roles;

    private Boolean activated;
}
