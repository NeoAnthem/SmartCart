package com.smartcart.service;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl
        implements EmailService {

    private final JavaMailSender
            mailSender;

    public EmailServiceImpl(
            JavaMailSender mailSender) {

        this.mailSender = mailSender;
    }

    @Override
    @Async
    public void sendOrderConfirmationEmail(
            String to,
            String customerName,
            Long orderId,
            Double amount) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true,
                            "UTF-8");

            helper.setTo(to);

            helper.setSubject(
                    "🛒 SmartCart - Order Confirmed");

            helper.setFrom(
                    new InternetAddress(
                            "9967196404darshan@gmail.com",
                            "SmartCart"));

            String htmlContent =

                    """
                    <div style="
                        max-width:600px;
                        margin:auto;
                        font-family:Arial,sans-serif;
                        background:#ffffff;
                        border-radius:15px;
                        overflow:hidden;
                        box-shadow:0 4px 12px rgba(0,0,0,0.1);
                    ">

                        <div style="
                            background:linear-gradient(90deg,#ec4899,#8b5cf6);
                            padding:30px;
                            text-align:center;
                            color:white;
                        ">
                            <h1>🛒 SmartCart</h1>
                            <h2>Order Confirmed</h2>
                        </div>

                        <div style="padding:30px;color:#333;">

                            <h3>Hello %s,</h3>

                            <p>
                                Thank you for shopping with
                                <b>SmartCart</b>.
                            </p>

                            <p>
                                Your order has been placed
                                successfully 🎉
                            </p>

                            <div style="
                                background:#f3f4f6;
                                padding:20px;
                                border-radius:10px;
                                margin:25px 0;
                            ">

                                <h3>Order Details</h3>

                                <p>
                                    <b>Order ID:</b> #%d
                                </p>

                                <p>
                                    <b>Total Amount:</b>
                                    ₹%.2f
                                </p>

                            </div>

                            <p>
                                You can track your order anytime
                                from your SmartCart account.
                            </p>

                            <div style="
                                text-align:center;
                                margin-top:30px;
                            ">

                                <a href="http://localhost:5173/orders"
                                   style="
                                    background:linear-gradient(90deg,#ec4899,#8b5cf6);
                                    color:white;
                                    text-decoration:none;
                                    padding:14px 30px;
                                    border-radius:8px;
                                    display:inline-block;
                                    font-weight:bold;
                                   ">
                                    View Orders
                                </a>

                            </div>

                            <hr style="margin-top:40px;">

                            <p style="
                                color:#666;
                                font-size:14px;
                                text-align:center;
                            ">
                                Thank you for choosing SmartCart ❤️
                                <br><br>
                                Team SmartCart 🚀
                            </p>

                        </div>

                    </div>
                    """
                            .formatted(
                                    customerName,
                                    orderId,
                                    amount);

            helper.setText(
                    htmlContent,
                    true);

            mailSender.send(message);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to send email",
                    e);
        }
    }
}