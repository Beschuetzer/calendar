package com.example.backend.calendar_user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class CalendarUserService {
    private final CalendarUserRepository repository;
    private final Logger logger = LoggerFactory.getLogger(CalendarUserService.class);


    @Autowired
    public CalendarUserService(CalendarUserRepository calendarUserRepository) {
        this.repository = calendarUserRepository;
    }

    public ResponseEntity<Iterable<CalendarUser>> getUsers() {
        return ResponseEntity.ok(repository.findAll());
    }

    public ResponseEntity<Iterable<CalendarUser>> getMatchingUsers(String query) {
        logger.info(String.format("query = %s", query));
        Optional<Iterable<CalendarUser>> optionalCalendarUser = repository.findMatchingUsers(query);

        if (optionalCalendarUser.isEmpty()) throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No matches were found");
        return ResponseEntity.ok(optionalCalendarUser.get());
    }
}
