package com.chobby.backend.exception;

public class DuplicateDiaryException extends RuntimeException {
    public DuplicateDiaryException(String message) {
        super(message);
    }
}
