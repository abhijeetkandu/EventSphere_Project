package com.abhijeet.eventsphere.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numberOfTickets;

    private Double totalAmount;

    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="event_id")
    private Event event;

    @PrePersist
    public void prePersist(){
        bookingDate = LocalDateTime.now();
        if(status == null){
            status = BookingStatus.BOOKED;
        }
    }

}
