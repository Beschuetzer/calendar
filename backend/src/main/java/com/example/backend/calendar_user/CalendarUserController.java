package com.example.backend.calendar_user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
public class CalendarUserController {
    private final CalendarUserService service;

    @Autowired
    public CalendarUserController(CalendarUserService userService) {
        this.service = userService;
    }

    @GetMapping
    public Iterable<CalendarUser> getUsers() {
        return this.service.getUsers();
    }
}
