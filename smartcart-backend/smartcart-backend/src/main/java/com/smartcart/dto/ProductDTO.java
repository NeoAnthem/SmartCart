package com.smartcart.dto;

import jakarta.validation.constraints.*;

public class ProductDTO {

    @NotBlank
    private String name;

    private String description;

    @NotNull
    private Double price;

    @NotNull
    private Integer stock;

    private String imageUrl;

    @NotNull
    private Long categoryId;

    public ProductDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(
            Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(
            Integer stock) {
        this.stock = stock;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(
            String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(
            Long categoryId) {
        this.categoryId = categoryId;
    }
}