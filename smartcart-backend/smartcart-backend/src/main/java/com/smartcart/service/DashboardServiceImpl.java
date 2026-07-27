package com.smartcart.service;

import com.smartcart.dto.DashboardDTO;
import com.smartcart.entity.Order;
import com.smartcart.repository.OrderRepository;
import com.smartcart.repository.ProductRepository;
import com.smartcart.repository.UserRepository;
import com.smartcart.dto.MonthlyRevenueDTO;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import com.smartcart.dto.DailyRevenueDTO;

@Service
public class DashboardServiceImpl
        implements DashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public DashboardServiceImpl(
            UserRepository userRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository) {

        this.userRepository =
                userRepository;

        this.productRepository =
                productRepository;

        this.orderRepository =
                orderRepository;
    }

    @Override
    public DashboardDTO getDashboard() {

        DashboardDTO dto = new DashboardDTO();

        dto.setTotalUsers(
                userRepository.count());

        dto.setTotalProducts(
                productRepository.count());

        List<Order> orders =
                orderRepository.findAll();

        List<Order> recentOrders = orders.stream()

                .sorted((o1, o2) ->
                        o2.getOrderDate().compareTo(
                                o1.getOrderDate()))

                .limit(5)

                .toList();

        dto.setRecentOrders(recentOrders);

        dto.setTotalOrders(
                orderRepository.count());

        double revenue = 0;

        long pending = 0;
        long shipped = 0;
        long delivered = 0;
        long cancelled = 0;

        for (Order order : orders) {

            revenue += order.getTotalAmount();

            switch (order.getStatus()) {

                case "PENDING":
                    pending++;
                    break;

                case "SHIPPED":
                    shipped++;
                    break;

                case "DELIVERED":
                    delivered++;
                    break;

                case "CANCELLED":
                    cancelled++;
                    break;
            }
        }

        dto.setTotalRevenue(revenue);

        Map<Month, Double> revenueMap =
                new HashMap<>();

        for (Order order : orders) {

            if (order.getOrderDate() != null) {

                Month month =
                        order.getOrderDate()
                                .getMonth();

                revenueMap.put(

                        month,

                        revenueMap.getOrDefault(
                                month,
                                0.0
                        ) + order.getTotalAmount()

                );

            }

        }

        List<MonthlyRevenueDTO> monthlyRevenue =
                new ArrayList<>();

        for (Month month : Month.values()) {

            monthlyRevenue.add(

                    new MonthlyRevenueDTO(

                            month.getDisplayName(

                                    TextStyle.SHORT,

                                    Locale.ENGLISH

                            ),

                            revenueMap.getOrDefault(
                                    month,
                                    0.0
                            )

                    )

            );

        }

        dto.setMonthlyRevenue(
                monthlyRevenue
        );

        LinkedHashMap<LocalDate, Double> dailyRevenueMap =
                new LinkedHashMap<>();

        for (int i = 29; i >= 0; i--) {

            dailyRevenueMap.put(
                    LocalDate.now().minusDays(i),
                    0.0
            );

        }

        for (Order order : orders) {

            if (order.getOrderDate() == null)
                continue;

            LocalDate date =
                    order.getOrderDate().toLocalDate();

            if (dailyRevenueMap.containsKey(date)) {

                dailyRevenueMap.put(

                        date,

                        dailyRevenueMap.get(date)
                                + order.getTotalAmount()

                );

            }

        }

        List<DailyRevenueDTO> dailyRevenue =
                new ArrayList<>();

        for (Map.Entry<LocalDate, Double> entry
                : dailyRevenueMap.entrySet()) {

            dailyRevenue.add(

                    new DailyRevenueDTO(

                            entry.getKey(),

                            entry.getValue()

                    )

            );

        }

        dto.setDailyRevenue(
                dailyRevenue
        );

        dto.setPendingOrders(pending);

        dto.setShippedOrders(shipped);

        dto.setDeliveredOrders(delivered);

        dto.setCancelledOrders(cancelled);

        return dto;
    }
}