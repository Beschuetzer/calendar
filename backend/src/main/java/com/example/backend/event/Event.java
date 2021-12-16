package com.example.backend.event;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    Long id;
    @JsonProperty
    LocalDateTime dateTime;
    @JsonProperty
    String title;
    @JsonProperty
    String description;

    public Event(LocalDateTime dateTime, String title, String description) {
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
