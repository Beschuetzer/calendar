package com.example.backend.invite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InviteService {
    private final InviteRepository repository;

    @Autowired
    public InviteService(InviteRepository inviteRepository) {
        this.repository = inviteRepository;
    }

    public Iterable<Invite> getAllInvites() {
        return repository.findAll();
    }
}
