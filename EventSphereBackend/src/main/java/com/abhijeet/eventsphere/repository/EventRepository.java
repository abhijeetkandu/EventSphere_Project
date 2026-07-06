package com.abhijeet.eventsphere.repository;

import com.abhijeet.eventsphere.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByCityIgnoreCase(String city);
    List<Event> findByCategoryIgnoreCase(String category);
    List<Event> findByCityIgnoreCaseAndCategoryIgnoreCase(String city, String category);
    @Query("SELECT COALESCE(SUM(e.availableSeats),0) FROM Event e")
    Integer sumAvailableSeats();
}
