package com.example.backend.invite;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InviteRepository extends CrudRepository<Invite, Long> {
    @Query("SELECT new com.example.backend.invite.InviteWithUsername(i.eventId, i.inviteeId, u.username) FROM Invite i INNER JOIN CalendarUser u ON u.id = i.inviteeId WHERE i.eventId = :eventId")
    Optional<Iterable<InviteWithUsername>> findInvitesByEventId(
            @Param("eventId") Long eventId
    );

    @Query("SELECT i FROM Invite i INNER JOIN CalendarUser u ON u.id = i.inviteeId WHERE u.username = :username")
    Optional<Invite[]>findInvitesByUsername(
            @Param("username") String username
    );
}
