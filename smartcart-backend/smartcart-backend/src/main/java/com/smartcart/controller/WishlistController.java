package com.smartcart.controller;

import com.smartcart.dto.WishlistDTO;
import com.smartcart.entity.Wishlist;
import com.smartcart.service.WishlistService;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService
            wishlistService;

    public WishlistController(
            WishlistService wishlistService) {

        this.wishlistService =
                wishlistService;
    }

    @PostMapping
    public Wishlist addToWishlist(

            @Valid
            @RequestBody
            WishlistDTO wishlistDTO,

            Authentication authentication) {

        return wishlistService.addToWishlist(
                authentication.getName(),
                wishlistDTO);
    }

    @GetMapping
    public List<Wishlist> getWishlist(
            Authentication authentication) {

        return wishlistService.getWishlist(
                authentication.getName());
    }

    @DeleteMapping("/{id}")
    public String removeFromWishlist(
            @PathVariable Long id) {

        wishlistService.removeFromWishlist(
                id);

        return "Wishlist Item Removed";
    }
}