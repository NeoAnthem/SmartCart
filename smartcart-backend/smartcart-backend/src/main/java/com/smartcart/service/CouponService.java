package com.smartcart.service;

import com.smartcart.entity.Coupon;

public interface CouponService {

    Coupon createCoupon(
            Coupon coupon);

    Double validateCoupon(
            String code);
}