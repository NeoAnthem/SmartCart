package com.smartcart.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.smartcart.entity.Order;
import com.smartcart.entity.OrderItem;
import com.smartcart.repository.OrderRepository;

import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class InvoiceServiceImpl
        implements InvoiceService {

    private final OrderRepository orderRepository;

    public InvoiceServiceImpl(
            OrderRepository orderRepository) {

        this.orderRepository = orderRepository;
    }

    @Override
    public ByteArrayInputStream generateInvoice(
            Long orderId) {

        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Order not found"));

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        PdfWriter writer =
                new PdfWriter(out);

        PdfDocument pdf =
                new PdfDocument(writer);

        Document document =
                new Document(pdf);

        document.add(
                new Paragraph("🛒 SmartCart")
                        .setFontSize(28)
                        .setBold());

        document.add(
                new Paragraph("PROFESSIONAL INVOICE")
                        .setFontSize(18));

        document.add(
                new Paragraph(
                        "Invoice Date: "
                                + order.getOrderDate()));

        document.add(
                new Paragraph(
                        "Order ID: #"
                                + order.getId()));

        document.add(
                new Paragraph(
                        "Order Status: "
                                + order.getStatus()));

        document.add(
                new Paragraph(
                        "Customer Name: "
                                + order.getUser().getName()));

        document.add(
                new Paragraph(
                        "Customer Email: "
                                + order.getUser().getEmail()));

        document.add(
                new Paragraph(
                        "------------------------------------------------"));

        document.add(
                new Paragraph("ORDER ITEMS")
                        .setBold()
                        .setFontSize(16));

        for (OrderItem item :
                order.getOrderItems()) {

            document.add(
                    new Paragraph(
                            item.getProduct().getName()
                                    + "\nQuantity : "
                                    + item.getQuantity()
                                    + "\nUnit Price : ₹"
                                    + item.getPrice()
                                    + "\nSubtotal : ₹"
                                    + (item.getPrice()
                                    * item.getQuantity()))
            );

            document.add(
                    new Paragraph(
                            "------------------------------------------------"));
        }

        if (order.getCouponCode() != null) {

            document.add(
                    new Paragraph(
                            "Coupon Applied : "
                                    + order.getCouponCode())
                            .setBold());

            document.add(
                    new Paragraph(
                            "Discount Saved : ₹"
                                    + order.getDiscountAmount())
                            .setBold());
        }

        document.add(
                new Paragraph(
                        "Original Amount : ₹"
                                + order.getOriginalAmount()));

        if (order.getDiscountAmount() != null
                && order.getDiscountAmount() > 0) {

            document.add(
                    new Paragraph(
                            "Discount Saved : -₹"
                                    + order.getDiscountAmount()));
        }

        document.add(
                new Paragraph(
                        "FINAL PAYABLE AMOUNT : ₹"
                                + order.getTotalAmount())
                        .setBold()
                        .setFontSize(18));

        document.add(
                new Paragraph(
                        "\nThank you for shopping with SmartCart ❤️"));

        document.add(
                new Paragraph(
                        "This is a system generated invoice."));

        document.close();

        return new ByteArrayInputStream(
                out.toByteArray());
    }
}