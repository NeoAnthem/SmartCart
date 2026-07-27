package com.smartcart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartcart.entity.Category;

public interface CategoryRepository
        extends JpaRepository<Category, Long> {
}