package com.smartcart.service;

import com.smartcart.entity.User;
import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    void deleteUser(Long id);

    void updateUserRole(Long id, String role);

}