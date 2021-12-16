package com.example.backend.calendar_user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalendarUserService {
    private final CalendarUserRepository repository;

    @Autowired
    public CalendarUserService(CalendarUserRepository calendarUserRepository) {
        this.repository = calendarUserRepository;
    }

    public Iterable<CalendarUser> getUsers() {
        return repository.findAll();
    }
}
