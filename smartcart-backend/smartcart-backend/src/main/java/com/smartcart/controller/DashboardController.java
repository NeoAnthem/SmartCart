package com.smartcart.controller;

import com.smartcart.dto.DashboardDTO;
import com.smartcart.service.DashboardService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService
            dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService =
                dashboardService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public DashboardDTO getDashboard() {

        return dashboardService
                .getDashboard();
    }
}