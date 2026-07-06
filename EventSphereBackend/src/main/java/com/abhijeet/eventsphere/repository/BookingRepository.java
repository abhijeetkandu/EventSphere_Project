package com.abhijeet.eventsphere.repository;

import com.abhijeet.eventsphere.model.Booking;
import com.abhijeet.eventsphere.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);

    List<Booking> findAllByOrderByBookingDateDesc();

    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b")
    Double sumTotalRevenue();
}
