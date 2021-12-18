package com.example.backend.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
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

    public ResponseEntity<Event> editEvent(Long id, Long ownerID, Event newEvent) {
        System.out.println("ownerID = " + ownerID);
        System.out.println("newEvent = " + newEvent.toString());
        Optional<Event> optionalEvent = repository.findById(id);

        if(optionalEvent.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event with id of '%s' was not found.");
        if (optionalEvent.get().owner != ownerID) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not allowed to modify that event!");

        repository.save(newEvent);
        return ResponseEntity.ok(optionalEvent.get());
    }

    public ResponseEntity<Event> addEvent(Event eventToAdd) {
        //TODO: need to see if the event already exists?
        Optional<Event> optionalEvent = repository.findByTitleAndOwner(eventToAdd.title, eventToAdd.owner);
        if (optionalEvent.isPresent()) throw new ResponseStatusException(HttpStatus.FOUND, String.format("An event with the title of '%s' already exists.  Try changing the title.", eventToAdd.title));

        eventToAdd.dateTime = LocalDateTime.now();
        return ResponseEntity.ok(repository.save(eventToAdd));
    }

    public ResponseEntity<String> deleteEvent(Long id, Long ownerId) {
        if (id == null || id <= 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("'%s' is not a valid event id.", id));

        Optional<Event> optionalEvent = repository.findById(id);
        if (optionalEvent.isEmpty()) throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("An event with the id of '%s' was not found.", id));
        if (!optionalEvent.get().owner.equals(ownerId)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("You do not have permission to do that."));

        repository.deleteById(id);
        return ResponseEntity.ok(String.format("Event with id of '%s' has been deleted.", id));
    }
}
