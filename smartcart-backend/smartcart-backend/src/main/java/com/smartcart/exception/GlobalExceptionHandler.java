package com.smartcart.exception;

import com.smartcart.dto.ErrorResponseDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO>
    handleUserAlreadyExists(
            UserAlreadyExistsException ex) {

        return new ResponseEntity<>(
                new ErrorResponseDTO(ex.getMessage()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(
            InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponseDTO>
    handleInvalidCredentials(
            InvalidCredentialsException ex) {

        return new ResponseEntity<>(
                new ErrorResponseDTO(
                        ex.getMessage()),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(
            CategoryNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO>
    handleCategoryNotFound(
            CategoryNotFoundException ex) {

        return new ResponseEntity<>(
                new ErrorResponseDTO(
                        ex.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(
            ProductNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO>
    handleProductNotFound(
            ProductNotFoundException ex) {

        return new ResponseEntity<>(
                new ErrorResponseDTO(
                        ex.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(
            MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>>
    handleValidationExceptions(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors =
                new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()));

        return new ResponseEntity<>(
                errors,
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String>
    handleRuntimeException(
            RuntimeException ex) {

        return ResponseEntity
                .badRequest()
                .body(ex.getMessage());
    }

}