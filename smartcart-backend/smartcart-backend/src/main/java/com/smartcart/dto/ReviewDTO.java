package com.smartcart.dto;

import jakarta.validation.constraints.*;

public class ReviewDTO {

    @NotNull
    private Long productId;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;

    @NotBlank
    private String comment;

    public ReviewDTO() {
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(
            Long productId) {
        this.productId = productId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(
            Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(
            String comment) {
        this.comment = comment;
    }
}