package com.smartcart.dto;

import jakarta.validation.constraints.NotBlank;

public class OrderStatusDTO {

    @NotBlank
    private String status;

    public OrderStatusDTO() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status) {

        this.status = status;
    }
}