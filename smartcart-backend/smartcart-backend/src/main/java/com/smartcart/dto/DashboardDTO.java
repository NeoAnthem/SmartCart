package com.smartcart.dto;

import java.util.List;
import com.smartcart.entity.Order;

public class DashboardDTO {

    private Long totalUsers;

    private Long totalProducts;

    private Long totalOrders;

    private Double totalRevenue;

    private long pendingOrders;

    private long shippedOrders;

    private long deliveredOrders;

    private long cancelledOrders;

    private List<MonthlyRevenueDTO> monthlyRevenue;

    private List<DailyRevenueDTO> dailyRevenue;

    private List<Order> recentOrders;

    public DashboardDTO() {
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(
            Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public List<Order> getRecentOrders() {
        return recentOrders;
    }

    public void setRecentOrders(List<Order> recentOrders) {
        this.recentOrders = recentOrders;
    }

    public List<DailyRevenueDTO> getDailyRevenue() {
        return dailyRevenue;
    }

    public void setDailyRevenue(
            List<DailyRevenueDTO> dailyRevenue) {

        this.dailyRevenue = dailyRevenue;
    }

    public List<MonthlyRevenueDTO> getMonthlyRevenue() {
        return monthlyRevenue;
    }

    public void setMonthlyRevenue(
            List<MonthlyRevenueDTO> monthlyRevenue) {

        this.monthlyRevenue = monthlyRevenue;
    }

    public long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public long getShippedOrders() {
        return shippedOrders;
    }

    public void setShippedOrders(long shippedOrders) {
        this.shippedOrders = shippedOrders;
    }

    public long getDeliveredOrders() {
        return deliveredOrders;
    }

    public void setDeliveredOrders(long deliveredOrders) {
        this.deliveredOrders = deliveredOrders;
    }

    public long getCancelledOrders() {
        return cancelledOrders;
    }

    public void setCancelledOrders(long cancelledOrders) {
        this.cancelledOrders = cancelledOrders;
    }

    public Long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(
            Long totalProducts) {
        this.totalProducts = totalProducts;
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
}