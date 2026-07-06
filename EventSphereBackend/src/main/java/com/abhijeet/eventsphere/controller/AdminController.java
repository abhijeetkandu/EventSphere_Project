package com.abhijeet.eventsphere.controller;

import com.abhijeet.eventsphere.model.Booking;
import com.abhijeet.eventsphere.response.DashboardResponse;
import com.abhijeet.eventsphere.service.AdminService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {
        return adminService.getDashboard();
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return adminService.getAllBookings();
    }
}
