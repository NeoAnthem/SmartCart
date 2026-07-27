package com.smartcart.service;

import com.smartcart.dto.ReviewDTO;
import com.smartcart.entity.Review;

import java.util.List;

public interface ReviewService {

    Review addReview(
            String email,
            ReviewDTO reviewDTO);

    List<Review> getReviews(
            Long productId);
}