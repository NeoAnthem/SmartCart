package com.smartcart.service;

import com.smartcart.dto.PaymentDTO;
import com.smartcart.dto.PaymentResponseDTO;

import java.util.List;

public interface PaymentService {

    PaymentResponseDTO processPayment(
            PaymentDTO paymentDTO);

    List<PaymentResponseDTO> getPayments();
}