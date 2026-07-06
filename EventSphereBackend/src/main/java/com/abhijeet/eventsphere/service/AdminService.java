package com.abhijeet.eventsphere.service;

import com.abhijeet.eventsphere.model.Booking;
import com.abhijeet.eventsphere.repository.BookingRepository;
import com.abhijeet.eventsphere.repository.EventRepository;
import com.abhijeet.eventsphere.repository.UserRepository;
import com.abhijeet.eventsphere.response.DashboardResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;

    public AdminService(UserRepository userRepository,
                        EventRepository eventRepository,
                        BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
    }

    public DashboardResponse getDashboard() {
        return new DashboardResponse(
                userRepository.count(),
                eventRepository.count(),
                bookingRepository.count(),
                eventRepository.sumAvailableSeats(),
                bookingRepository.sumTotalRevenue()
        );
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAllByOrderByBookingDateDesc();
    }
}
