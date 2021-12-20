package com.example.backend.invite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("invites")
public class InviteController {
    private final InviteService service;

    @Autowired
    public InviteController(InviteService inviteService) {
        this.service = inviteService;
    }

    @GetMapping
    public Iterable<Invite> getAllInvites() {
        return this.service.getAllInvites();
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> addInvites(
            @RequestParam("eventId") Long eventId,
            @RequestBody Long[] userIds
    ) {
        return this.service.addInvites(eventId, userIds);
    }
}
