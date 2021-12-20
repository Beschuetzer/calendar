package com.example.backend.invite;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Invite {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    @JsonProperty
    Long eventId;
    @JsonProperty
    Long inviteeId;

    public Invite(Long eventId, Long inviteeId) {
        this.eventId = eventId;
        this.inviteeId = inviteeId;
    }

    public Invite() {

    }

    public Long getId() {
        return id;
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
                "id=" + id +
                ", eventId=" + eventId +
                ", inviteeId=" + inviteeId +
                '}';
    }
}
