package com.smartcart.repository;

import com.smartcart.entity.Cart;
import com.smartcart.entity.User;
import com.smartcart.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository
        extends JpaRepository<Cart, Long> {

    List<Cart> findByUser(
            User user);

    Cart findByUserAndProduct(
            User user,
            Product product);

    long countByUserId(Long userId);

}