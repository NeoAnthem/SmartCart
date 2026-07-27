package com.smartcart.service;

import com.smartcart.dto.ReviewDTO;
import com.smartcart.entity.Product;
import com.smartcart.entity.Review;
import com.smartcart.entity.User;
import com.smartcart.repository.ProductRepository;
import com.smartcart.repository.ReviewRepository;
import com.smartcart.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl
        implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public ReviewServiceImpl(
            ReviewRepository reviewRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {

        this.reviewRepository =
                reviewRepository;

        this.userRepository =
                userRepository;

        this.productRepository =
                productRepository;
    }

    @Override
    public Review addReview(
            String email,
            ReviewDTO reviewDTO) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User Not Found"));

        Product product =
                productRepository.findById(
                                reviewDTO.getProductId())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product Not Found"));

        Review review =
                new Review();

        review.setUser(user);
        review.setProduct(product);

        review.setRating(
                reviewDTO.getRating());

        review.setComment(
                reviewDTO.getComment());

        review.setReviewDate(
                LocalDateTime.now());

        return reviewRepository.save(
                review);
    }

    @Override
    public List<Review> getReviews(
            Long productId) {

        Product product =
                productRepository.findById(
                                productId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product Not Found"));

        return reviewRepository.findByProduct(
                product);
    }
}