package com.smartcart.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "coupons")
public class Coupon {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;

    private Double discount;

    private Boolean active;

    public Coupon() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(
            String code) {
        this.code = code;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(
            Double discount) {
        this.discount = discount;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(
            Boolean active) {
        this.active = active;
    }
}