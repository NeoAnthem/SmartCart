package com.smartcart.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "reviews")
@JsonIgnoreProperties({
        "hibernateLazyInitializer",
        "handler"
})
public class Review {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({
            "password",
            "orders",
            "cartItems",
            "wishlist"
    })
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties({
            "category"
    })
    private Product product;

    private Integer rating;

    private String comment;

    private LocalDateTime reviewDate;

    public Review() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(
            LocalDateTime reviewDate) {
        this.reviewDate = reviewDate;
    }
}