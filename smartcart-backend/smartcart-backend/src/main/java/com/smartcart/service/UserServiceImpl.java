package com.smartcart.service;

import com.smartcart.entity.User;
import com.smartcart.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl
        implements UserService {

    private final UserRepository
            userRepository;

    public UserServiceImpl(
            UserRepository userRepository) {

        this.userRepository =
                userRepository;
    }

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @Override
    public void deleteUser(
            Long id) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        if (user.getRole()
                .equals("ROLE_ADMIN")) {

            throw new RuntimeException(
                    "Admin cannot be deleted");
        }

        userRepository.delete(user);
    }

    @Override
    public void updateUserRole(Long id, String role) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!role.equals("ROLE_ADMIN") &&
                !role.equals("ROLE_CUSTOMER")) {

            throw new RuntimeException("Invalid role");
        }

        user.setRole(role);

        userRepository.save(user);
    }
}