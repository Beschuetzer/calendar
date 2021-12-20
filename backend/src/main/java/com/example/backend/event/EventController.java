package com.example.backend.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("events")
public class EventController {
    private EventService service;

    @Autowired
    public EventController(EventService service) {
        this.service = service;
    }

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
        @RequestParam Long id,
        @RequestParam Long ownerId
    ) {
        return this.service.deleteEvent(id, ownerId);
    }
}

