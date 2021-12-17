package com.example.backend.register;

import com.example.backend.calendar_user.CalendarUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class RegisterController {
    private final RegisterService service;

    @Autowired
    public RegisterController(RegisterService service) {
        this.service = service;
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<CalendarUser> register(
            @RequestBody CalendarUser user
    ) {
        return this.service.register(user);
    }
}
