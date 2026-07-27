package com.smartcart.service;

import com.smartcart.exception.UserAlreadyExistsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartcart.dto.RegisterRequestDTO;
import com.smartcart.entity.User;
import com.smartcart.repository.UserRepository;

import com.smartcart.dto.LoginRequestDTO;
import com.smartcart.util.JwtUtil;

import com.smartcart.exception.InvalidCredentialsException;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public String register(RegisterRequestDTO request) {

        if (userRepository.findByEmail(
                request.getEmail()).isPresent()) {

            throw new UserAlreadyExistsException(
                    "Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole("ROLE_CUSTOMER");

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @Override
    public User login(
            LoginRequestDTO request) {

        User user =
                userRepository.findByEmail(
                                request.getEmail())
                        .orElseThrow(
                                () ->
                                        new InvalidCredentialsException(
                                                "Invalid Email or Password"));

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!matches) {

            throw new InvalidCredentialsException(
                    "Invalid Email or Password");
        }

        return user;
    }
}