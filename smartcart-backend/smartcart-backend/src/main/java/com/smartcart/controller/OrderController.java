package com.smartcart.controller;

import com.smartcart.entity.Order;
import com.smartcart.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.smartcart.dto.OrderStatusDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import com.smartcart.service.InvoiceService;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService
            orderService;

    private final InvoiceService
            invoiceService;

    public OrderController(
            OrderService orderService,
            InvoiceService invoiceService) {

        this.orderService =
                orderService;

        this.invoiceService =
                invoiceService;
    }

    @PostMapping("/checkout")
    public Order checkout(

            Authentication authentication,

            @RequestParam(
                    required = false)
            String couponCode) {

        return orderService.checkout(

                authentication.getName(),

                couponCode);
    }

    @GetMapping
    public List<Order> getOrders(
            Authentication authentication) {

        return orderService.getOrders(
                authentication.getName());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public Order updateStatus(

            @PathVariable Long id,

            @RequestBody
            OrderStatusDTO dto) {

        return orderService
                .updateOrderStatus(
                        id,
                        dto.getStatus());
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<Order> cancelOrder(
            @PathVariable Long id) {

        System.out.println("INSIDE CANCEL METHOD");

        return ResponseEntity.ok(
                orderService.cancelOrder(id));
    }

    @GetMapping(
            "/invoice/{orderId}")
    public ResponseEntity<InputStreamResource>
    downloadInvoice(
            @PathVariable
            Long orderId) {

        InputStreamResource file =
                new InputStreamResource(
                        invoiceService
                                .generateInvoice(
                                        orderId));

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=invoice_"
                                + orderId
                                + ".pdf")

                .contentType(
                        MediaType.APPLICATION_PDF)

                .body(file);
    }
}