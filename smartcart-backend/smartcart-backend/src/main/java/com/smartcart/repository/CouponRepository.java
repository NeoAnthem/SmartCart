package com.smartcart.repository;

import com.smartcart.entity.Coupon;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CouponRepository
        extends JpaRepository<Coupon, Long> {

    Optional<Coupon>
    findByCode(
            String code);
}