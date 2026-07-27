package com.smartcart.service;

import java.io.ByteArrayInputStream;

public interface InvoiceService {

    ByteArrayInputStream generateInvoice(
            Long orderId);
}