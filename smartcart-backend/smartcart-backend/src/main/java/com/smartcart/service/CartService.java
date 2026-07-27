package com.smartcart.service;

import com.smartcart.dto.CartDTO;
import com.smartcart.entity.Cart;


import java.util.List;

public interface CartService {

    Cart addToCart(
            String email,
            CartDTO cartDTO);

    List<Cart> getCart(
            String email);

    void removeFromCart(
            Long cartId);

    Cart updateQuantity(
            Long cartId,
            Integer quantity
    );
}