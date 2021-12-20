package com.example.backend.invite;

import com.fasterxml.jackson.annotation.JsonProperty;

public class InviteWithUsername {
    @JsonProperty
    Long eventId;
    @JsonProperty
    Long inviteeId;
    @JsonProperty
    String username;

    public InviteWithUsername(Long eventId, Long inviteeId, String username) {
        this.eventId = eventId;
        this.inviteeId = inviteeId;
        this.username = username;
    }

    public InviteWithUsername() {

    }

    public Long getEventId() {
        return eventId;
    }

    public Long getInviteeId() {
        return inviteeId;
    }

    @Override
    public String toString() {
        return "Invite{" +
                ", eventId=" + eventId +
                ", inviteeId=" + inviteeId +
                ", username=" + username +
                '}';
    }
}
