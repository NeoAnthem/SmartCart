package com.smartcart.service;

import com.smartcart.entity.Order;

import java.util.List;

public interface OrderService {

    Order checkout(
            String email,
            String couponCode);

    List<Order> getOrders(
            String email);

    List<Order> getAllOrders();

    Order updateOrderStatus(
            Long orderId,
            String status);

    Order cancelOrder(Long orderId);
}