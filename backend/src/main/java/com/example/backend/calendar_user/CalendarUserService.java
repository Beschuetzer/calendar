package com.example.backend.calendar_user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CalendarUserService {
    private final CalendarUserRepository repository;
    private final Logger logger = LoggerFactory.getLogger(CalendarUserService.class);


    @Autowired
    public CalendarUserService(CalendarUserRepository calendarUserRepository) {
        this.repository = calendarUserRepository;
    }

    public ResponseEntity<Iterable<CalendarUserUsernameOnly>> getUsers() {
        Optional<CalendarUser[]> optionalCalendarUsers = repository.findAllUsers();

        if(optionalCalendarUsers.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something went wrong!");

        List<CalendarUserUsernameOnly> toReturn = new ArrayList<>();
        for(CalendarUser calendarUser : optionalCalendarUsers.get()) {
            toReturn.add(new CalendarUserUsernameOnly(calendarUser.getUsername()));
        }

        return ResponseEntity.ok(toReturn);
    }

    public ResponseEntity<Iterable<CalendarUserUsernameOnly>> getMatchingUsers(String query) {
        List<CalendarUserUsernameOnly> toReturn = new ArrayList<>();
        if (query.equals("")) return ResponseEntity.ok(toReturn);

        Optional<Iterable<CalendarUser>> optionalCalendarUsers = repository.findMatchingUsers(query);

        if (optionalCalendarUsers.isEmpty())
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No matches were found");

        for(CalendarUser calendarUser : optionalCalendarUsers.get()) {
            toReturn.add(new CalendarUserUsernameOnly(calendarUser.getUsername()));
        }

        return ResponseEntity.ok(toReturn);
    }
}
