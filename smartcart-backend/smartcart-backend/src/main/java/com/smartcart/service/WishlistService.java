package com.smartcart.service;

import com.smartcart.dto.WishlistDTO;
import com.smartcart.entity.Wishlist;

import java.util.List;

public interface WishlistService {

    Wishlist addToWishlist(
            String email,
            WishlistDTO wishlistDTO);

    List<Wishlist> getWishlist(
            String email);

    void removeFromWishlist(
            Long wishlistId);
}