package com.smartcart.service;

import com.smartcart.dto.CartDTO;
import com.smartcart.entity.Cart;
import com.smartcart.entity.Product;
import com.smartcart.entity.User;
import com.smartcart.exception.ProductNotFoundException;
import com.smartcart.repository.CartRepository;
import com.smartcart.repository.ProductRepository;
import com.smartcart.repository.UserRepository;

import com.smartcart.entity.Cart;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl
        implements CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartServiceImpl(
            CartRepository cartRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {

        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    public Cart addToCart(
            String email,
            CartDTO cartDTO) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User Not Found"));

        Product product =
                productRepository.findById(
                                cartDTO.getProductId())
                        .orElseThrow(
                                () -> new ProductNotFoundException(
                                        "Product Not Found"));

        if (cartDTO.getQuantity()
                > product.getStock()) {

            throw new RuntimeException(
                    "Insufficient Stock");
        }

        Cart existingCartItem =
                cartRepository.findByUserAndProduct(
                        user,
                        product);

        if (existingCartItem != null) {

            int newQuantity =
                    existingCartItem.getQuantity()
                            + cartDTO.getQuantity();

            if (newQuantity
                    > product.getStock()) {

                throw new RuntimeException(
                        "Only "
                                + product.getStock()
                                + " items available in stock");
            }

            existingCartItem.setQuantity(
                    newQuantity);

            return cartRepository.save(
                    existingCartItem);
        }

        Cart cart = new Cart();

        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(
                cartDTO.getQuantity());

        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> getCart(
            String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User Not Found"));

        return cartRepository.findByUser(user);
    }

    @Override
    public void removeFromCart(
            Long cartId) {

        cartRepository.deleteById(cartId);
    }

    @Override
    public Cart updateQuantity(
            Long cartId,
            Integer quantity) {

        Cart cartItem =
                cartRepository
                        .findById(cartId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Cart Item Not Found"
                                )
                        );

        if (quantity
                > cartItem.getProduct()
                .getStock()) {

            throw new RuntimeException(
                    "Only "
                            + cartItem.getProduct()
                            .getStock()
                            + " items available in stock");
        }

        cartItem.setQuantity(
                quantity
        );

        return cartRepository.save(
                cartItem
        );
    }
}