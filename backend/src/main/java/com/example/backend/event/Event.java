package com.example.backend.event;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Event {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "event_sequence"
    )
    @SequenceGenerator(
            name = "event_sequence",
            sequenceName = "event_sequence",
            allocationSize = 1
    )
    Long id;
    @JsonProperty
    Long ownerId;
    @JsonProperty
    LocalDateTime dateTime;
    @JsonProperty
    String title;
    @JsonProperty
    String description;

    public Event(Long ownerId, LocalDateTime dateTime, String title, String description) {
        this.ownerId = ownerId;
        this.dateTime = dateTime;
        this.title = title;
        this.description = description;
    }

    public Event() {

    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
