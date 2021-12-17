package com.example.backend.login;

import com.example.backend.calendar_user.CalendarUser;
import com.example.backend.calendar_user.CalendarUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class LoginService {
    private final CalendarUserRepository calendarUserRepository;

    @Autowired
    public LoginService(CalendarUserRepository calendarUserRepository) {
        this.calendarUserRepository = calendarUserRepository;
    }

    public ResponseEntity<CalendarUser> getUserByCredentials(String username, String hashedPassword) {
        if (username == null || hashedPassword == null) return null;
        Optional<CalendarUser> optionalCalendarUser = calendarUserRepository.findCalendarUserByCredentials(username, hashedPassword);

//        if (optionalCalendarUser.isPresent()) return optionalCalendarUser.get();
//        return null;

        if (optionalCalendarUser.isPresent()) {
            return ResponseEntity.ok(optionalCalendarUser.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Incorrect password or username doesn't exist.");
        }
    }
}
