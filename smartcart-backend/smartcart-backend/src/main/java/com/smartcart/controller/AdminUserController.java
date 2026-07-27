package com.smartcart.controller;

import com.smartcart.entity.User;
import com.smartcart.service.UserService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final UserService
            userService;

    public AdminUserController(
            UserService userService) {

        this.userService =
                userService;
    }

    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return "User deleted successfully";
    }

    @PutMapping("/{id}/role")
    public String updateRole(
            @PathVariable Long id,
            @RequestParam String role) {

        userService.updateUserRole(id, role);

        return "Role updated successfully";
    }
}