package com.smartcart.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY)
    private Long id;

    private String status;

    private String paymentStatus = "PENDING";

    private String couponCode;

    private Double discountAmount;

    private Double originalAmount;

    @ManyToOne
    @JoinColumn(
            name = "user_id")
    private User user;

    private Double totalAmount;

    private LocalDateTime orderDate;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JsonManagedReference
    private List<OrderItem> orderItems;

    public Order() {
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(
            String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Long getId() {
        return id;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(
            List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(
            String couponCode) {

        this.couponCode = couponCode;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(
            Double discountAmount) {

        this.discountAmount = discountAmount;
    }

    public Double getOriginalAmount() {
        return originalAmount;
    }

    public void setOriginalAmount(
            Double originalAmount) {

        this.originalAmount =
                originalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status) {

        this.status = status;
    }

    public void setId(
            Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(
            User user) {
        this.user = user;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(
            Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(
            LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
}