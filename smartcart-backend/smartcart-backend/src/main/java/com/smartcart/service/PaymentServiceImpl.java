package com.smartcart.service;

import com.smartcart.dto.PaymentDTO;
import com.smartcart.dto.PaymentResponseDTO;
import com.smartcart.entity.Order;
import com.smartcart.entity.Payment;
import com.smartcart.repository.OrderRepository;
import com.smartcart.repository.PaymentRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class PaymentServiceImpl
        implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            OrderRepository orderRepository) {

        this.paymentRepository =
                paymentRepository;

        this.orderRepository =
                orderRepository;
    }

    @Override
    public PaymentResponseDTO processPayment(
            PaymentDTO paymentDTO) {

        Order order =
                orderRepository.findById(
                                paymentDTO.getOrderId())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Order Not Found"));

        Payment payment =
                new Payment();

        payment.setOrder(order);

        payment.setAmount(
                order.getTotalAmount());

        payment.setPaymentMethod(
                paymentDTO.getPaymentMethod());

        payment.setPaymentDate(
                LocalDateTime.now());

        Random random = new Random();

        boolean success = random.nextInt(100) < 85;

        payment.setPaymentStatus(
                success
                        ? "SUCCESS"
                        : "FAILED"
        );

        order.setPaymentStatus(
                success
                        ? "SUCCESS"
                        : "FAILED"
        );

        orderRepository.save(order);

        Payment savedPayment =
                paymentRepository.save(
                        payment);

        if (!success) {

            throw new RuntimeException(
                    "Payment failed. Please try again."
            );
        }

        return mapToDTO(
                savedPayment);
    }

    @Override
    public List<PaymentResponseDTO>
    getPayments() {

        return paymentRepository
                .findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    private PaymentResponseDTO
    mapToDTO(
            Payment payment) {

        PaymentResponseDTO dto =
                new PaymentResponseDTO();

        dto.setId(
                payment.getId());

        dto.setAmount(
                payment.getAmount());

        dto.setPaymentMethod(
                payment.getPaymentMethod());

        dto.setPaymentStatus(
                payment.getPaymentStatus());

        dto.setPaymentDate(
                payment.getPaymentDate());

        return dto;
    }
}