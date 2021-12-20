package com.example.backend.calendar_user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<Iterable<CalendarUser>> getUsers(@Nullable @RequestParam String query) {
        if (query != null) return this.service.getMatchingUsers(query);
        return this.service.getUsers();
    }

}
