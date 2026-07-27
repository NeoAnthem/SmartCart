package com.smartcart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileStatsDTO {

    private long totalOrders;

    private long wishlistItems;

    private long cartItems;

    private String memberSince;
}