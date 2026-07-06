package com.abhijeet.eventsphere.service;

import com.abhijeet.eventsphere.model.Booking;
import com.abhijeet.eventsphere.model.BookingStatus;
import com.abhijeet.eventsphere.model.Event;
import com.abhijeet.eventsphere.model.User;
import com.abhijeet.eventsphere.repository.BookingRepository;
import com.abhijeet.eventsphere.repository.EventRepository;
import com.abhijeet.eventsphere.repository.UserRepository;
import com.abhijeet.eventsphere.response.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          EventRepository eventRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Booking bookEvent(Long eventId, Integer numberOfTickets, Authentication authentication) {
        if (numberOfTickets == null || numberOfTickets <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Number of tickets must be greater than zero");
        }

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        if (event.getAvailableSeats() == null || event.getAvailableSeats() < numberOfTickets) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough seats available");
        }

        event.setAvailableSeats(event.getAvailableSeats() - numberOfTickets);
        eventRepository.save(event);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setNumberOfTickets(numberOfTickets);
        booking.setTotalAmount(event.getTicketPrice() * numberOfTickets);
        booking.setStatus(BookingStatus.BOOKED);

        return bookingRepository.save(booking);
    }

    public List<Booking> myBookings(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return bookingRepository.findByUser(user);
    }

    public Booking getBookingById(Long bookingId, Authentication authentication) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (!booking.getUser().getEmail().equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to view this booking");
        }

        return booking;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAllByOrderByBookingDateDesc();
    }

    @Transactional
    public MessageResponse cancelBooking(Long bookingId, Authentication authentication) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (!booking.getUser().getEmail().equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to cancel this booking");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Booking already cancelled");
        }

        Event event = booking.getEvent();
        event.setAvailableSeats(event.getAvailableSeats() + booking.getNumberOfTickets());
        booking.setStatus(BookingStatus.CANCELLED);

        eventRepository.save(event);
        bookingRepository.save(booking);

        return MessageResponse.success("Booking cancelled successfully");
    }
}
