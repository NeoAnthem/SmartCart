package com.smartcart.repository;

import com.smartcart.entity.Product;
import com.smartcart.entity.User;
import com.smartcart.entity.Wishlist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository
        extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findByUser(
            User user);

    boolean existsByUserAndProduct(
            User user,
            Product product);

    long countByUserId(Long userId);

}