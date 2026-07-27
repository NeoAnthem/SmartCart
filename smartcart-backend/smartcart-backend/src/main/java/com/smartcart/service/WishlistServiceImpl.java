package com.smartcart.service;

import com.smartcart.dto.WishlistDTO;
import com.smartcart.entity.Product;
import com.smartcart.entity.User;
import com.smartcart.entity.Wishlist;
import com.smartcart.repository.ProductRepository;
import com.smartcart.repository.UserRepository;
import com.smartcart.repository.WishlistRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistServiceImpl
        implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistServiceImpl(
            WishlistRepository wishlistRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {

        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    public Wishlist addToWishlist(
            String email,
            WishlistDTO wishlistDTO) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User Not Found"));

        Product product =
                productRepository.findById(
                                wishlistDTO.getProductId())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product Not Found"));

        if (wishlistRepository
                .existsByUserAndProduct(
                        user,
                        product)) {

            throw new RuntimeException(
                    "Product already exists in wishlist");
        }

        Wishlist wishlist =
                new Wishlist();

        wishlist.setUser(user);
        wishlist.setProduct(product);

        return wishlistRepository.save(
                wishlist);
    }

    @Override
    public List<Wishlist> getWishlist(
            String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User Not Found"));

        return wishlistRepository.findByUser(
                user);
    }

    @Override
    public void removeFromWishlist(
            Long wishlistId) {

        wishlistRepository.deleteById(
                wishlistId);
    }
}