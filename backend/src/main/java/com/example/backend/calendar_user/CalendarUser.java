package com.example.backend.calendar_user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CalendarUser {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    Long id;
    @JsonProperty
    String username;
    @JsonProperty
    String hashedPassword;

    public CalendarUser() {
    }

    public CalendarUser(String username, String hashedPassword) {
        this.username = username;
        this.hashedPassword = hashedPassword;
    }

    public String getUsername() {
        return username;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "CalendarUser{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", hashedPassword='" + hashedPassword + '\'' +
                '}';
    }
}
