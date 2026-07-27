package com.smartcart.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PaymentDTO {

    @NotNull
    private Long orderId;

    @NotBlank
    private String paymentMethod;

    public PaymentDTO() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(
            Long orderId) {
        this.orderId = orderId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(
            String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}