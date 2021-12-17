package com.example.backend.calendar_user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarUserRepository extends CrudRepository<CalendarUser, Long> {

}
