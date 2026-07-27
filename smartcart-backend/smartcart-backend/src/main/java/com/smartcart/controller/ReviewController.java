package com.smartcart.controller;

import com.smartcart.dto.ReviewDTO;
import com.smartcart.entity.Review;
import com.smartcart.service.ReviewService;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService
            reviewService;

    public ReviewController(
            ReviewService reviewService) {

        this.reviewService =
                reviewService;
    }

    @PostMapping
    public Review addReview(

            @Valid
            @RequestBody
            ReviewDTO reviewDTO,

            Authentication authentication) {

        return reviewService.addReview(
                authentication.getName(),
                reviewDTO);
    }

    @GetMapping("/{productId}")
    public List<Review> getReviews(
            @PathVariable Long productId) {

        return reviewService.getReviews(
                productId);
    }
}