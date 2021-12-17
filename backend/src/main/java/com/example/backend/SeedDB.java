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
import com.example.backend.invite.Invite;
import com.example.backend.invite.InviteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class SeedDB {
    @Bean
    CommandLineRunner commandLineRunner(
            EventRepository eventRepository,
            CalendarUserRepository calendarUserRepository,
            InviteRepository inviteRepository
        ) {
        return args -> {
            CalendarUser u1 = new CalendarUser("test", "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");
            CalendarUser u2 = new CalendarUser("test2", "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");
            CalendarUser u3 = new CalendarUser("test3", "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");
            CalendarUser u4 = new CalendarUser("test4", "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");
            calendarUserRepository.saveAll(List.of(u1, u2, u3, u4));

            Event e1 = new Event(4L, LocalDateTime.now(), "Event 1", "Some description");
            Event e2 = new Event(4L, LocalDateTime.now(), "Event 2", "Some description 2");
            Event e3 = new Event(4L, LocalDateTime.now(), "Event 3", "Some description 3");
            Event e4 = new Event(4L, LocalDateTime.now(), "Event 4", "Some description 4");
            eventRepository.saveAll(List.of(e1,e2,e3,e4));

            Invite i1_2 = new Invite(5L, 1L);
            Invite i1_1 = new Invite(6L, 1L);
            Invite i1_3 = new Invite(7L, 1L);
            Invite i1_4 = new Invite(8L, 1L);

            Invite i2_2 = new Invite(5L, 2L);
            Invite i2_4 = new Invite(8L, 2L);

            Invite i3_2 = new Invite(6L, 3L);
            Invite i3_4 = new Invite(7L, 3L);
            inviteRepository.saveAll(List.of(
                    i1_1, i1_2, i1_3, i1_4,
                    i2_2, i2_4,
                    i3_2, i3_4
            ));
        };
    }
}
