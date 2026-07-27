package com.smartcart.service;

import com.smartcart.dto.ProductPerformanceDTO;
import com.smartcart.dto.ReportDTO;
import com.smartcart.entity.Order;
import com.smartcart.entity.OrderItem;
import com.smartcart.entity.Product;
import com.smartcart.repository.OrderRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import com.smartcart.dto.MonthlyRevenueDTO;
import java.time.Month;
import java.util.ArrayList;
import java.util.Map;
import java.util.LinkedHashMap;
import com.smartcart.repository.OrderItemRepository;
import java.util.*;
import com.smartcart.repository.ProductRepository;

@Service
public class ReportServiceImpl
        implements ReportService {

    private final OrderRepository
            orderRepository;

    private final OrderItemRepository orderItemRepository;

    private final ProductRepository productRepository;

    private static class ProductStats {

        Product product;

        int unitsSold;

        double revenue;

        ProductStats(Product product) {

            this.product = product;

        }

    }

    public ReportServiceImpl(

            OrderRepository orderRepository,

            OrderItemRepository orderItemRepository,

            ProductRepository productRepository) {

        this.orderRepository = orderRepository;

        this.orderItemRepository = orderItemRepository;

        this.productRepository = productRepository;
    }


    @Override
    public ReportDTO getSalesReport() {

        List<Order> orders =
                orderRepository.findAll();

        ReportDTO dto =
                new ReportDTO();

        long totalOrders = orders.size();

        double revenue = 0;

        double highestOrder = 0;

        for (Order order : orders) {

            revenue += order.getTotalAmount();

            if (order.getTotalAmount() > highestOrder) {

                highestOrder = order.getTotalAmount();

            }
        }

        dto.setTotalOrders(totalOrders);

        dto.setTotalRevenue(revenue);

        dto.setHighestOrder(highestOrder);

        if (totalOrders > 0) {

            dto.setAverageOrderValue(
                    revenue / totalOrders);

        } else {

            dto.setAverageOrderValue(0.0);

        }

        return dto;
    }

    @Override
    public List<MonthlyRevenueDTO> getMonthlyRevenue() {

        List<Order> orders = orderRepository.findAll();

        Map<Month, Double> revenueMap = new LinkedHashMap<>();

        // Initialize all months with zero revenue
        for (Month month : Month.values()) {
            revenueMap.put(month, 0.0);
        }

        // Add revenue to the appropriate month
        for (Order order : orders) {

            if (order.getOrderDate() == null) {
                continue;
            }

            Month month = order.getOrderDate().getMonth();

            revenueMap.put(
                    month,
                    revenueMap.get(month) + order.getTotalAmount()
            );
        }

        List<MonthlyRevenueDTO> monthlyRevenue = new ArrayList<>();

        for (Map.Entry<Month, Double> entry : revenueMap.entrySet()) {

            monthlyRevenue.add(

                    new MonthlyRevenueDTO(

                            entry.getKey()
                                    .name()
                                    .substring(0, 1)
                                    + entry.getKey()
                                    .name()
                                    .substring(1, 3)
                                    .toLowerCase(),

                            entry.getValue()

                    )

            );

        }

        return monthlyRevenue;
    }

    @Override
    public List<ProductPerformanceDTO> getProductPerformance() {

        List<Product> products =
                productRepository.findAll();

        List<OrderItem> orderItems =
                orderItemRepository.findAll();

        Map<Long, ProductStats> productMap =
                new LinkedHashMap<>();

        for (Product product : products) {

            productMap.put(

                    product.getId(),

                    new ProductStats(product)

            );

        }

        for (OrderItem item : orderItems) {

            Product product = item.getProduct();

            ProductStats stats =
                    productMap.get(product.getId());

            stats.unitsSold += item.getQuantity();

            stats.revenue +=
                    item.getPrice() * item.getQuantity();
        }

        List<ProductPerformanceDTO> result =
                new ArrayList<>();

        for (ProductStats stats : productMap.values()) {

            double averagePrice =

                    stats.unitsSold == 0

                            ? stats.product.getPrice()

                            : stats.revenue / stats.unitsSold;

            result.add(

                    new ProductPerformanceDTO(

                            stats.product.getName(),

                            stats.product
                                    .getCategory()
                                    .getName(),

                            stats.unitsSold,

                            stats.revenue,

                            averagePrice,

                            stats.product.getStock()

                    )

            );
        }

        result.sort(

                (a, b) ->

                        Integer.compare(

                                b.getUnitsSold(),

                                a.getUnitsSold()

                        )

        );

        return result;
    }

}