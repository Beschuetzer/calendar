package com.example.backend.invite;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InviteRepository extends CrudRepository<Invite, Long> {
    @Query("SELECT i FROM Invite i WHERE i.eventId = :eventId")
    Optional<Iterable<Invite>> findInvitesByEventId(
            @Param("eventId") Long eventId
    );
}
