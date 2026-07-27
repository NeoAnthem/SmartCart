package com.smartcart.service;

import com.smartcart.dto.LoginRequestDTO;
import com.smartcart.dto.RegisterRequestDTO;

import com.smartcart.entity.User;

public interface AuthService {

    String register(RegisterRequestDTO request);

    User login(LoginRequestDTO request);

}