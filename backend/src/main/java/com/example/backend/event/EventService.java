package com.example.backend.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class EventService {
    private final EventRepository repository;

    @Autowired
    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    public ResponseEntity<Event[]> getEvents(String username) {
        Optional<Event[]> optionalEvents = repository.findAllByUsername(username);

        if(optionalEvents.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("No records found with the username '%s'", username));
        System.out.println(optionalEvents.get());
        return ResponseEntity.ok(optionalEvents.get());
    }

    public Iterable<Event> getAllEvents() {
        return repository.findAll();
    }

    public ResponseEntity<Event> editEvent(Long id, Event newEvent) {
        System.out.println("id = " + id);
        Optional<Event> optionalEvent = repository.findById(id);

        if(optionalEvent.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event with id of '%s' was not found.");
        repository.save(newEvent);

        return ResponseEntity.ok(optionalEvent.get());
    }
}
