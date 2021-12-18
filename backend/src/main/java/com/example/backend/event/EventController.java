package com.example.backend.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("events")
public class EventController {
    private EventService service;

    @Autowired
    public EventController(EventService service) {
        this.service = service;
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<Event[]> getEvents(
            @RequestParam String username
    ) {
        return this.service.getEvents(username);
    }

    @CrossOrigin
    @GetMapping("all")
    public Iterable<Event> getEvents() {
        return this.service.getAllEvents();
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Event> addEvent(
            @RequestBody Event eventToAdd
    ) {
        return this.service.addEvent(eventToAdd);
    }

    @CrossOrigin
    @PutMapping()
    public ResponseEntity editEvent(
            @RequestParam Long id,
            @RequestParam Long ownerId,
            @RequestBody Event newEvent
    ) {
        return this.service.editEvent(id, ownerId, newEvent);
    }

    @CrossOrigin
    @DeleteMapping
    public ResponseEntity<String> deleteEvent(
        @RequestParam Long id
    ) {
        return this.service. deleteEvent(id);
    }
}

