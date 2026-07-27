package com.smartcart.controller;

import com.smartcart.dto.CartDTO;
import com.smartcart.entity.Cart;
import com.smartcart.service.CartService;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(
            CartService cartService) {

        this.cartService = cartService;
    }

    @PostMapping
    public Cart addToCart(
            @Valid
            @RequestBody
            CartDTO cartDTO,

            Authentication authentication) {

        return cartService.addToCart(
                authentication.getName(),
                cartDTO);
    }

    @GetMapping
    public List<Cart> getCart(
            Authentication authentication) {

        return cartService.getCart(
                authentication.getName());
    }

    @DeleteMapping("/{cartId}")
    public String removeFromCart(
            @PathVariable Long cartId) {

        cartService.removeFromCart(
                cartId);

        return "Item Removed";
    }

    @PutMapping("/{cartId}")
    public Cart updateQuantity(
            @PathVariable Long cartId,
            @RequestParam Integer quantity) {

        return cartService.updateQuantity(
                cartId,
                quantity
        );
    }
}