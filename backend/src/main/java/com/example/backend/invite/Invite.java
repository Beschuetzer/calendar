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
    @JsonProperty
    Boolean isAttending;

    public Invite(Long eventId, Long inviteeId, String eventTitle) {
        this.eventId = eventId;
        this.inviteeId = inviteeId;
        this.eventTitle = eventTitle;
        this.isAttending = null;
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

    public String getEventTitle() {
        return eventTitle;
    }

    public Boolean getIsAttending() {
        return isAttending;
    }

    public void setAttending(Boolean attending) {
        isAttending = attending;
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


