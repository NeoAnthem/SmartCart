package com.smartcart.controller;

import com.smartcart.dto.ProductPerformanceDTO;
import com.smartcart.dto.ReportDTO;
import com.smartcart.service.ReportService;
import com.smartcart.dto.MonthlyRevenueDTO;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService
            reportService;

    public ReportController(
            ReportService reportService) {

        this.reportService =
                reportService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/sales")
    public ReportDTO getSalesReport() {

        return reportService
                .getSalesReport();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/monthly-revenue")
    public List<MonthlyRevenueDTO> getMonthlyRevenue() {

        return reportService.getMonthlyRevenue();

    }

    @GetMapping("/product-performance")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ProductPerformanceDTO> getProductPerformance() {

        return reportService.getProductPerformance();

    }

}