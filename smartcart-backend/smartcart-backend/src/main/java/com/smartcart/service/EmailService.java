package com.smartcart.service;

public interface EmailService {

    void sendOrderConfirmationEmail(
            String to,
            String customerName,
            Long orderId,
            Double amount);
}