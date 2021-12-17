package com.example.backend.register;

import com.example.backend.calendar_user.CalendarUser;
import com.example.backend.calendar_user.CalendarUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class RegisterService {
    private final CalendarUserRepository calendarUserRepository;

    @Autowired
    public RegisterService(CalendarUserRepository calendarUserRepository) {
        this.calendarUserRepository = calendarUserRepository;
    }

    public ResponseEntity<CalendarUser> register(CalendarUser user) {
        System.out.println(user);
        Optional<CalendarUser> optionalCalendarUser = calendarUserRepository.findCalendarUserByUsername(user.getUsername());
        if (optionalCalendarUser.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("The username %s is already taken", user.getUsername()));
        return ResponseEntity.ok(optionalCalendarUser.get());
    }
}
