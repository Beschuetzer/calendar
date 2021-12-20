package com.example.backend.calendar_user;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CalendarUserUsernameOnly {
    @JsonProperty
    private String username;

    public CalendarUserUsernameOnly(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
