package com.smartcart.service;

import com.smartcart.entity.Coupon;
import com.smartcart.repository.CouponRepository;

import org.springframework.stereotype.Service;

@Service
public class CouponServiceImpl
        implements CouponService {

    private final CouponRepository
            couponRepository;

    public CouponServiceImpl(
            CouponRepository couponRepository) {

        this.couponRepository =
                couponRepository;
    }

    @Override
    public Coupon createCoupon(
            Coupon coupon) {

        return couponRepository.save(
                coupon);
    }

    @Override
    public Double validateCoupon(
            String code) {

        Coupon coupon =
                couponRepository
                        .findByCode(code)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid Coupon"));

        if (!coupon.getActive()) {

            throw new RuntimeException(
                    "Coupon Expired");
        }

        return coupon.getDiscount();
    }
}