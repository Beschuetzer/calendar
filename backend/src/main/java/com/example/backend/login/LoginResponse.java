package com.example.backend.login;

import com.example.backend.calendar_user.CalendarUser;
import com.example.backend.event.Event;
import com.example.backend.invite.Invite;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponse {
    @JsonProperty
    private CalendarUser user;
    @JsonProperty
    private Iterable<Invite> invites;
    @JsonProperty
    private Iterable<Event> events;

    public LoginResponse(CalendarUser user, Iterable<Invite> invites, Iterable<Event> events) {
        this.user = user;
        this.invites = invites;
        this.events = events;
    }

    public CalendarUser getUser() {
        return user;
    }

    public Iterable<Invite> getInvites() {
        return invites;
    }

    public Iterable<Event> getEvents() {
        return events;
    }
}
