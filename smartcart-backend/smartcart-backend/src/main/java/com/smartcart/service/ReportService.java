package com.smartcart.service;

import com.smartcart.dto.MonthlyRevenueDTO;
import com.smartcart.dto.ReportDTO;
import java.util.List;
import com.smartcart.dto.ProductPerformanceDTO;

public interface ReportService {

    ReportDTO getSalesReport();

    List<MonthlyRevenueDTO> getMonthlyRevenue();

    List<ProductPerformanceDTO> getProductPerformance();

}