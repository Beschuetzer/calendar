package com.example.backend.event;
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

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class EventConfig {
    @Bean
    CommandLineRunner commandLineRunner(EventRepository repository) {
        return args -> {
            Event e1 = new Event(LocalDateTime.now(), "Event 1", "Some description");
            Event e2 = new Event(LocalDateTime.now(), "Event 2", "Some description 2");
            Event e3 = new Event(LocalDateTime.now(), "Event 3", "Some description 3");
            Event e4 = new Event(LocalDateTime.now(), "Event 4", "Some description 4");

            repository.saveAll(List.of(e1,e2,e3,e4));
        };
    }
}
