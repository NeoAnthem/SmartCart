package com.smartcart.dto;

public class ReportDTO {

    private Long totalOrders;

    private Double totalRevenue;

    private Double averageOrderValue;

    private Double highestOrder;

    public ReportDTO() {
    }

    public Double getHighestOrder() {
        return highestOrder;
    }

    public void setHighestOrder(Double highestOrder) {
        this.highestOrder = highestOrder;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(
            Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(
            Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Double getAverageOrderValue() {
        return averageOrderValue;
    }

    public void setAverageOrderValue(
            Double averageOrderValue) {
        this.averageOrderValue =
                averageOrderValue;
    }
}