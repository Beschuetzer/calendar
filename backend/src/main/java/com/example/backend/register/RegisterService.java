package com.example.backend.register;

import com.example.backend.calendar_user.CalendarUser;
import com.example.backend.calendar_user.CalendarUserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegisterService {
    private final CalendarUserRepository calendarUserRepository;

    @Autowired

    public ResponseEntity<CalendarUser> register(CalendarUser user) {
        System.out.println(user);
        //need to check if username is already taken (
        Optional<CalendarUser> optionalCalendarUser = rep
        //if taken return response entity error

        //else add to CalendarUser table and return ok response
    }
}
