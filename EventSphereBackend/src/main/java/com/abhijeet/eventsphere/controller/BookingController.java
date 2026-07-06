package com.abhijeet.eventsphere.controller;

import com.abhijeet.eventsphere.model.Booking;
import com.abhijeet.eventsphere.response.MessageResponse;
import com.abhijeet.eventsphere.service.BookingService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/{eventId}/{tickets}")
    public Booking bookEvent(@PathVariable Long eventId,
                               @PathVariable Integer tickets,
                               Authentication authentication) {
        return bookingService.bookEvent(eventId, tickets, authentication);
    }

    @GetMapping("/my")
    public List<Booking> myBookings(Authentication authentication) {
        return bookingService.myBookings(authentication);
    }

    @GetMapping("/{id}")
    public Booking getBooking(@PathVariable Long id, Authentication authentication) {
        return bookingService.getBookingById(id, authentication);
    }

    @PutMapping("/cancel/{bookingId}")
    public MessageResponse cancelBooking(@PathVariable Long bookingId,
                                         Authentication authentication) {
        return bookingService.cancelBooking(bookingId, authentication);
    }
}
