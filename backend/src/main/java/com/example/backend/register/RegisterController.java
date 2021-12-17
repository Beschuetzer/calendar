package com.example.backend.register;

import com.example.backend.calendar_user.CalendarUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class RegisterController {
    private final RegisterService service;
    private final Logger logger = LoggerFactory.getLogger(RegisterController.class);


    @Autowired
    public RegisterController(RegisterService service) {
        this.service = service;
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<CalendarUser> register(
            @RequestBody CalendarUser user
    ) {
        logger.info(String.valueOf(user.toString()));
        return this.service.register(user);
    }
}
