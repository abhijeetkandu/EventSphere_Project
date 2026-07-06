package com.abhijeet.eventsphere.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String category;

    private String venue;

    private String city;

    private LocalDate eventDate;

    private Double ticketPrice;

    private Integer totalSeats;

    private Integer availableSeats;

    private String imageUrl;

    private LocalDateTime createdAt;

    @JsonIgnore
    @OneToMany(mappedBy = "event")
    private List<Booking> bookings;

    @PrePersist
    public void prePersist(){
        createdAt = LocalDateTime.now();

        if(availableSeats == null){
            availableSeats = totalSeats;
        }
    }
}
