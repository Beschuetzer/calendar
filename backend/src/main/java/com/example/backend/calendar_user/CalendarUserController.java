package com.example.backend.calendar_user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class CalendarUserController {
    private final CalendarUserService service;

    @Autowired
    public CalendarUserController(CalendarUserService userService) {
        this.service = userService;
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<Iterable<CalendarUserUsernameOnly>> getUsers(@Nullable @RequestParam String query) {
        if (query != null) return this.service.getMatchingUsers(query);
        return this.service.getUsers();
    }

}
