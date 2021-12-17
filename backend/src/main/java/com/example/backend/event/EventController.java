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

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<Event[]> getEvents(
            @RequestParam String username
    ) {
        return this.service.getEvents(username);
    }


}

