package com.example.backend.invite;

import com.example.backend.calendar_user.CalendarUser;
import com.example.backend.calendar_user.CalendarUserRepository;
import com.example.backend.event.Event;
import com.example.backend.event.EventRepository;
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
public class InviteService {
    private final InviteRepository repository;
    private final EventRepository eventRepository;
    private final CalendarUserRepository calendarUserRepository;
    private final Logger logger = LoggerFactory.getLogger(InviteService.class);

    @Autowired
    public InviteService(InviteRepository inviteRepository, EventRepository eventRepository, CalendarUserRepository calendarUserRepository) {
        this.repository = inviteRepository;
        this.eventRepository = eventRepository;
        this.calendarUserRepository = calendarUserRepository;
    }

    public Iterable<Invite> getAllInvites() {
        return repository.findAll();
    }

    public ResponseEntity<String> addInvites(Long eventId, String[] usernames) {
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if(optionalEvent.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("No event found with the id of %s.", eventId));

        Optional<Iterable<InviteWithUsername>> optionalInvites = repository.findInvitesByEventId(eventId);
        logger.info(optionalInvites.isPresent() ? optionalInvites.get().toString() : "no invites" );

        List<Invite> newInvites = new ArrayList<>();

        for (String username : usernames) {
            if (optionalInvites.isPresent()) {
                Boolean shouldAdd = true;
                for (InviteWithUsername inviteToCheck : optionalInvites.get()) {
                    if (inviteToCheck.username.equals(username)) {
                        shouldAdd = false;
                        break;
                    }
                }
                if (shouldAdd) newInvites.add(getNewInvite(eventId, username, optionalEvent.get().getTitle()));
            }
            else {
                newInvites.add(getNewInvite(eventId, username, optionalEvent.get().getTitle()));
            }
        }

        repository.saveAll(newInvites);
        return ResponseEntity.ok(String.format("Successfully added invitees to the event with id of %s", eventId));
    }

    private Invite getNewInvite(Long eventId, String username, String eventTitle) {
        Optional<CalendarUser> optionalCalendarUser = calendarUserRepository.findCalendarUserByUsername(username);
        if (optionalCalendarUser.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid username present");
        return new Invite(eventId, optionalCalendarUser.get().getId(), eventTitle);
    }
}
