package com.smartcart.dto;

public class ProductPerformanceDTO {

    private String productName;

    private String category;

    private Integer unitsSold;

    private Double revenue;

    private Double averagePrice;

    private Integer stockRemaining;

    public ProductPerformanceDTO() {
    }

    public ProductPerformanceDTO(
            String productName,
            String category,
            Integer unitsSold,
            Double revenue,
            Double averagePrice,
            Integer stockRemaining) {

        this.productName = productName;
        this.category = category;
        this.unitsSold = unitsSold;
        this.revenue = revenue;
        this.averagePrice = averagePrice;
        this.stockRemaining = stockRemaining;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getUnitsSold() {
        return unitsSold;
    }

    public void setUnitsSold(Integer unitsSold) {
        this.unitsSold = unitsSold;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }

    public Double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(Double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public Integer getStockRemaining() {
        return stockRemaining;
    }

    public void setStockRemaining(Integer stockRemaining) {
        this.stockRemaining = stockRemaining;
    }

}