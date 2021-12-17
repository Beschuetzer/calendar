package com.example.backend.login;

import com.example.backend.calendar_user.CalendarUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("login")
public class LoginController {
    private final LoginService service;

    @Autowired
    public LoginController(LoginService loginService) {
        this.service = loginService;
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
