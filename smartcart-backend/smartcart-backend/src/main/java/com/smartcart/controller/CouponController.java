package com.smartcart.controller;

import com.smartcart.entity.Coupon;
import com.smartcart.service.CouponService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    private final CouponService
            couponService;

    public CouponController(
            CouponService couponService) {

        this.couponService =
                couponService;
    }

    @PreAuthorize(
            "hasRole('ADMIN')")
    @PostMapping
    public Coupon createCoupon(

            @RequestBody
            Coupon coupon) {

        return couponService
                .createCoupon(
                        coupon);
    }

    @GetMapping("/validate/{code}")
    public Double validateCoupon(

            @PathVariable
            String code) {

        return couponService
                .validateCoupon(
                        code);
    }
}