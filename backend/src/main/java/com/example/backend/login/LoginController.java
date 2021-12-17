package com.example.backend.login;

import com.example.backend.calendar_user.CalendarUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("login")
public class LoginController {
    private final Logger logger = LoggerFactory.getLogger(LoginController.class);
    private final LoginService service;

    @Autowired
    public LoginController(LoginService loginService) {
        this.service = loginService;
        logger.info("Login controller started");
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<CalendarUser> getUserByCredentials(
            @Nullable @RequestParam("username") String username,
            @Nullable @RequestParam("hashedPassword") String hashedPassword
    ) {
        return this.service.getUserByCredentials(username, hashedPassword);
    }
}
