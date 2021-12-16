package com.example.backend.event;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Event {
    @Id
            @GeneratedValue(strategy = )
    Long id;
}
