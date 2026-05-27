package com.matpires.login_cookie.exceptions;

public class EmailAlreadyUsedException extends RuntimeException {
    public EmailAlreadyUsedException() {
        super("O email já encontra-se em uso.");
    }
}
