package com.example.backend.event;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    @Query("SELECT e FROM Event e INNER JOIN CalendarUser u ON e.ownerId = u.id WHERE u.username = :username")
    Optional<Event[]> findAllByUsername(
            @Param("username") String username
    );
}
