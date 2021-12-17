package com.example.backend.login;

import com.example.backend.calendar_user.CalendarUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login")
public class LoginController {
    private final LoginService service;

    @Autowired
    public LoginController(LoginService loginService) {
        this.service = loginService;
    }

    @GetMapping
    public CalendarUser getUserByCredentials(
            @RequestParam("username") String username,
            @RequestParam("hashedPassword") String hashedPassword
    ) {
        return this.service.getUserByCredentials(username, hashedPassword);
    }
}
