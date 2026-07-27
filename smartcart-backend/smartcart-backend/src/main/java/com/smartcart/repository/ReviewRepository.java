package com.smartcart.repository;

import com.smartcart.entity.Product;
import com.smartcart.entity.Review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    List<Review> findByProduct(
            Product product);
}