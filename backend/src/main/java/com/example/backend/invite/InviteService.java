package com.example.backend.invite;

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
    private final Logger logger = LoggerFactory.getLogger(InviteService.class);

    @Autowired
    public InviteService(InviteRepository inviteRepository, EventRepository eventRepository) {
        this.repository = inviteRepository;
        this.eventRepository = eventRepository;
    }

    public Iterable<Invite> getAllInvites() {
        return repository.findAll();
    }

    public ResponseEntity<String> addInvites(Long eventId, Long[] userIds) {
        //TODO: Check if event exists
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if(optionalEvent.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("No event found with the id of %s.", eventId));

        logger.info(String.format("eventId = %s", eventId));
        //TODO: Check if invite already exists for each userId
        //get all invites by eventId
        Optional<Invite[]> optionalInvites = repository.findInviteByEventId(eventId);

        List<Invite> invites = new ArrayList<>();

        if (optionalInvites.isEmpty()) invites = getInvites(eventId, userIds);


        repository.saveAll(invites);
        return ResponseEntity.ok(String.format("Successfully added invitees to the event with id of %s", eventId));
    }

    private List<Invite> getInvites(Long eventId, Long[] userIds) {
        List<Invite> invites = new ArrayList<>();
        for (Long userId : userIds) {
            logger.info(String.format("userIds.length = %s", userId));
            invites.add(new Invite(eventId, userId));
        }
        return invites;
    }
}
