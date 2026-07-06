package com.abhijeet.eventsphere.service;

import com.abhijeet.eventsphere.model.Event;
import com.abhijeet.eventsphere.repository.EventRepository;
import com.abhijeet.eventsphere.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event addEvent(Event event) {
        if (event.getAvailableSeats() == null && event.getTotalSeats() != null) {
            event.setAvailableSeats(event.getTotalSeats());
        }
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        if (updatedEvent.getTitle() != null) event.setTitle(updatedEvent.getTitle());
        if (updatedEvent.getDescription() != null) event.setDescription(updatedEvent.getDescription());
        if (updatedEvent.getCategory() != null) event.setCategory(updatedEvent.getCategory());
        if (updatedEvent.getVenue() != null) event.setVenue(updatedEvent.getVenue());
        if (updatedEvent.getCity() != null) event.setCity(updatedEvent.getCity());
        if (updatedEvent.getEventDate() != null) event.setEventDate(updatedEvent.getEventDate());
        if (updatedEvent.getTicketPrice() != null) event.setTicketPrice(updatedEvent.getTicketPrice());
        if (updatedEvent.getTotalSeats() != null) event.setTotalSeats(updatedEvent.getTotalSeats());
        if (updatedEvent.getAvailableSeats() != null) event.setAvailableSeats(updatedEvent.getAvailableSeats());
        if (updatedEvent.getImageUrl() != null) event.setImageUrl(updatedEvent.getImageUrl());

        return eventRepository.save(event);
    }

    public MessageResponse deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        eventRepository.delete(event);
        return MessageResponse.success("Event deleted successfully");
    }

    public List<Event> searchEvents(String city, String category) {
        if (city != null && !city.isBlank() && category != null && !category.isBlank()) {
            return eventRepository.findByCityIgnoreCaseAndCategoryIgnoreCase(city.trim(), category.trim());
        }
        if (city != null && !city.isBlank()) {
            return eventRepository.findByCityIgnoreCase(city.trim());
        }
        if (category != null && !category.isBlank()) {
            return eventRepository.findByCategoryIgnoreCase(category.trim());
        }
        return eventRepository.findAll();
    }

    public Page<Event> getEvents(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return eventRepository.findAll(pageable);
    }
}
