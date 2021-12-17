package com.example.backend.invite;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InviteRepository extends CrudRepository<Invite, Long> {
}
