package com.smartcart.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "order_id")
    private Order order;

    private Double amount;

    private String paymentMethod;

    private String paymentStatus;

    private LocalDateTime paymentDate;

    public Payment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(
            Order order) {
        this.order = order;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(
            Double amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(
            String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(
            String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(
            LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}