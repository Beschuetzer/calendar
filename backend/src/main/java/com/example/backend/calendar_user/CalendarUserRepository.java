package com.example.backend.calendar_user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CalendarUserRepository extends CrudRepository<CalendarUser, Long> {
    @Query("SELECT u FROM CalendarUser u WHERE u.username = :username AND u.hashedPassword = :hashedPassword")
    Optional<CalendarUser> findCalendarUserByCredentials(
            @Param("username") String username,
            @Param("hashedPassword") String hashedPassword
    );

    @Query("SELECT u FROM CalendarUser u WHERE u.username = :username")
    Optional<CalendarUser> findCalendarUserByUsername(
            @Param("username") String username
    );
}
