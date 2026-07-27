package com.smartcart.dto;

import jakarta.validation.constraints.NotNull;

public class InventoryDTO {

    @NotNull
    private Integer stock;

    public InventoryDTO() {
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(
            Integer stock) {
        this.stock = stock;
    }
}