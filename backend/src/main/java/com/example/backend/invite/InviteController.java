package com.example.backend.invite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
