package com.example.backend;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDate;
//import java.time.Month;
//import java.util.List;
//
////Seeding the Student table in the db via JPA
//@Configuration
//public class StudentConfig {
//    @Bean
//    CommandLineRunner commandLineRunner(StudentRepository repository) {
//        return args -> {
//            Student s1 = new Student("Mariam", "mariam.jamal@gmail.com", LocalDate.of(2000, Month.JANUARY, 5));
//            Student s2 = new Student("Alex", "alex.jamal@gmail.com", LocalDate.of(2000, Month.JANUARY, 5));
//
//            repository.saveAll(List.of(s1, s2));
//        };
//    }
//}

import com.example.backend.calendar_user.CalendarUser;
import com.example.backend.calendar_user.CalendarUserRepository;
import com.example.backend.event.Event;
import com.example.backend.event.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class SeedDB {
    @Bean
    CommandLineRunner commandLineRunner(EventRepository repository, CalendarUserRepository calendarUserRepository) {
        return args -> {
            Event e1 = new Event(LocalDateTime.now(), "Event 1", "Some description");
            Event e2 = new Event(LocalDateTime.now(), "Event 2", "Some description 2");
            Event e3 = new Event(LocalDateTime.now(), "Event 3", "Some description 3");
            Event e4 = new Event(LocalDateTime.now(), "Event 4", "Some description 4");

            repository.saveAll(List.of(e1,e2,e3,e4));

            CalendarUser u1 = new CalendarUser("user1", "someHashedPassword");
            CalendarUser u2 = new CalendarUser("user2", "someHashedPassword2");
            CalendarUser u3 = new CalendarUser("user3", "someHashedPassword3");
            CalendarUser u4 = new CalendarUser("user4", "someHashedPassword4");

            calendarUserRepository.saveAll(List.of(u1, u2, u3, u4));
        };
    }
}
