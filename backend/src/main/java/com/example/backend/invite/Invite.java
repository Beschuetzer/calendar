package com.example.backend.invite;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class Invite {
    @Id
    @SequenceGenerator(
            name = "invite_sequence",
            sequenceName = "invite_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "invite_sequence"
    )
    Long id;
    @JsonProperty
    Long eventId;
    @JsonProperty
    Long inviteeId;
    @JsonProperty
    String eventTitle;

    public Invite(Long eventId, Long inviteeId, String eventTitle) {
        this.eventId = eventId;
        this.inviteeId = inviteeId;
        this.eventTitle = eventTitle;
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


