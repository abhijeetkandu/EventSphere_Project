package com.abhijeet.eventsphere.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardResponse {

    private Long totalUsers;
    private Long totalEvents;
    private Long totalBookings;
    private Integer availableTickets;
    private Double totalRevenue;
}
