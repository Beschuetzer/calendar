package com.example.backend.login;

import com.example.backend.calendar_user.CalendarUser;
import com.example.backend.calendar_user.CalendarUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {
    private final CalendarUserRepository calendarUserRepository;

    @Autowired
    public LoginService(CalendarUserRepository calendarUserRepository) {
        this.calendarUserRepository = calendarUserRepository;
    }

    public CalendarUser getUserByCredentials(String username, String hashedPassword) {
        if (username == null || hashedPassword == null) return null;
        Optional<CalendarUser> optionalCalendarUser = calendarUserRepository.

    }
}
