package com.smartcart.controller;

import com.smartcart.dto.AuthResponseDTO;
import com.smartcart.dto.RegisterRequestDTO;
import com.smartcart.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.smartcart.dto.LoginRequestDTO;
import com.smartcart.dto.LoginResponseDTO;

import com.smartcart.entity.User;
import com.smartcart.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    private final JwtUtil jwtUtil;

    public AuthController(
            AuthService authService,
            JwtUtil jwtUtil) {

        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/register")
    public AuthResponseDTO register(
            @Valid
            @RequestBody RegisterRequestDTO request) {

        String message = authService.register(request);

        return new AuthResponseDTO(message);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(
            @RequestBody
            LoginRequestDTO request) {

        User user =
                authService.login(
                        request);

        String token =
                jwtUtil.generateToken(
                        user.getEmail());

        return new LoginResponseDTO(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}