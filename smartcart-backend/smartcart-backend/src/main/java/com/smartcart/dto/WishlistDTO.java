package com.smartcart.dto;

import jakarta.validation.constraints.NotNull;

public class WishlistDTO {

    @NotNull
    private Long productId;

    public WishlistDTO() {
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}