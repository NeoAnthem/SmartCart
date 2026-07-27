package com.smartcart.controller;

import com.smartcart.dto.PaymentDTO;
import com.smartcart.dto.PaymentResponseDTO;
import com.smartcart.service.PaymentService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService
            paymentService;

    public PaymentController(
            PaymentService paymentService) {

        this.paymentService =
                paymentService;
    }

    @PostMapping
    public PaymentResponseDTO
    processPayment(

            @Valid
            @RequestBody
            PaymentDTO paymentDTO) {

        return paymentService
                .processPayment(
                        paymentDTO);
    }

    @GetMapping
    public List<PaymentResponseDTO>
    getPayments() {

        return paymentService
                .getPayments();
    }
}