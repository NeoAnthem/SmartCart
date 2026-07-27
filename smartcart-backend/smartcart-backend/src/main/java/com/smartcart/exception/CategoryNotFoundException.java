package com.smartcart.exception;

public class CategoryNotFoundException
        extends RuntimeException {

    public CategoryNotFoundException(
            String message) {

        super(message);
    }
}