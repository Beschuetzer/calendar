package com.example.backend.login;

import com.example.backend.calendar_user.CalendarUser;
import com.example.backend.calendar_user.CalendarUserRepository;
import com.example.backend.event.Event;
import com.example.backend.event.EventRepository;
import com.example.backend.invite.Invite;
import com.example.backend.invite.InviteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LoginService {
    private final CalendarUserRepository calendarUserRepository;
    private final EventRepository eventRepository;
    private final InviteRepository inviteRepository;
    private final Logger logger = LoggerFactory.getLogger(LoginService.class);


    @Autowired
    public LoginService(CalendarUserRepository calendarUserRepository, EventRepository eventRepository, InviteRepository inviteRepository) {
        this.calendarUserRepository = calendarUserRepository;
        this.eventRepository = eventRepository;
        this.inviteRepository = inviteRepository;
    }

    public ResponseEntity<LoginResponse> loginUser(String username, String hashedPassword) {
        if (username == null || hashedPassword == null) return null;
        Optional<CalendarUser> optionalCalendarUser = calendarUserRepository.findCalendarUserByCredentials(username, hashedPassword);

        if (optionalCalendarUser.isPresent()) {
            Optional<Event[]> userEvents = eventRepository.findAllByUsername(username);
            Optional<Invite[]> userInvites = inviteRepository.findInvitesByUsername(username);

            List<Event> events = new ArrayList<>();
            List<Invite> invites = new ArrayList<>();

            if (userEvents.isPresent()) {
                for(Event event : userEvents.get()) {
                    events.add(event);
                }
            }

            if (userInvites.isPresent()) {
                for(Invite invite : userInvites.get()) {
                    logger.info(invite.toString());
                    invites.add(invite);
                }
            }

            return ResponseEntity.ok(new LoginResponse(optionalCalendarUser.get(), invites, events));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect password or username doesn't exist.");
        }
    }
}
