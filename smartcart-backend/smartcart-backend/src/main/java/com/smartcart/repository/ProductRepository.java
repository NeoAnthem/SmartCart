package com.smartcart.repository;

import com.smartcart.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    List<Product>
    findByNameContainingIgnoreCase(
            String keyword);

    Page<Product> findAll(Pageable pageable);

    List<Product> findByStockLessThan(
            Integer stock);

    List<Product> findByCategoryId(
            Long categoryId);

    List<Product> findAllByOrderByPriceAsc();

    List<Product> findAllByOrderByPriceDesc();
}