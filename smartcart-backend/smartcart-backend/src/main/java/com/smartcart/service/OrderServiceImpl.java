package com.smartcart.service;

import com.smartcart.entity.*;
import com.smartcart.repository.*;

import org.springframework.stereotype.Service;

import com.smartcart.service.EmailService;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl
        implements OrderService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final EmailService emailService;
    private final CouponRepository couponRepository;

    public OrderServiceImpl(
            UserRepository userRepository,
            CartRepository cartRepository,
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            ProductRepository productRepository,
            EmailService emailService,
            CouponRepository couponRepository) {

        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.emailService = emailService;
        this.couponRepository = couponRepository;
    }

    @Transactional
    @Override
    public Order checkout(
            String email,
            String couponCode) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User Not Found"));

        List<Cart> cartItems =
                cartRepository.findByUser(user);

        if (cartItems.isEmpty()) {

            throw new RuntimeException(
                    "Cart is Empty");
        }

        double totalAmount = 0;

        for (Cart cart : cartItems) {

            totalAmount +=
                    cart.getProduct().getPrice()
                            * cart.getQuantity();
        }

        double originalAmount =
                totalAmount;

        double discountAmount = 0;

        Order order = new Order();

        order.setOriginalAmount(
                originalAmount);

        if (couponCode != null
                &&
                !couponCode.isBlank()) {

            Coupon coupon =
                    couponRepository
                            .findByCode(couponCode)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Invalid Coupon"));

            if (!coupon.getActive()) {

                throw new RuntimeException(
                        "Coupon Expired");
            }

            discountAmount =
                    totalAmount *
                            coupon.getDiscount()
                            / 100;

            totalAmount =
                    totalAmount -
                            discountAmount;

            order.setCouponCode(
                    couponCode);

            order.setDiscountAmount(
                    discountAmount);
        }

        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setOrderDate(
                LocalDateTime.now());

        order.setStatus(
                "PENDING");

        Order savedOrder =
                orderRepository.save(order);

        for (Cart cart : cartItems) {

            Product product =
                    cart.getProduct();

            if (product.getStock()
                    < cart.getQuantity()) {

                throw new RuntimeException(
                        product.getName()
                                + " is out of stock");
            }

            product.setStock(
                    product.getStock()
                            - cart.getQuantity());

            productRepository.save(product);

            OrderItem item =
                    new OrderItem();

            item.setOrder(savedOrder);

            item.setProduct(product);

            item.setQuantity(
                    cart.getQuantity());

            item.setPrice(
                    product.getPrice());

            orderItemRepository.save(item);
        }

        cartRepository.deleteAll(
                cartItems);

        emailService
                .sendOrderConfirmationEmail(

                        user.getEmail(),

                        user.getName(),

                        savedOrder.getId(),

                        savedOrder.getTotalAmount()
                );

        return savedOrder;
    }

    @Override
    public List<Order> getOrders(
            String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User Not Found"));

        return orderRepository
                .findByUser(user);
    }

    @Override
    public List<Order> getAllOrders() {

        return orderRepository.findAll();

    }

    @Override
    public Order updateOrderStatus(
            Long orderId,
            String status) {

        Order order =
                orderRepository.findById(
                                orderId)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Order Not Found"));

        order.setStatus(status);

        return orderRepository.save(
                order);
    }

    @Override
    public Order cancelOrder(Long orderId) {

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (
                order.getStatus().equals("DELIVERED")
                        ||
                        order.getStatus().equals("CANCELLED")
        ) {

            throw new RuntimeException(
                    "This order can no longer be cancelled");
        }

        // Restore stock
        for (OrderItem item : order.getOrderItems()) {

            Product product = item.getProduct();

            product.setStock(
                    product.getStock() + item.getQuantity()
            );

            productRepository.save(product);
        }

        order.setStatus("CANCELLED");

        return orderRepository.save(order);
    }
}