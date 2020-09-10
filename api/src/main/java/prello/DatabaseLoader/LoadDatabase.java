package prello.DatabaseLoader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import prello.model.Appointment;
import prello.model.User;
import prello.repository.AppointmentRepository;
import prello.repository.UserRepository;

import java.sql.Timestamp;

@Configuration
public class LoadDatabase implements ApplicationListener<ContextRefreshedEvent> {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(AppointmentRepository appointmentRepository, UserRepository userRepository) {
        return args -> {
            log.info("Initial data: " + appointmentRepository.save(new Appointment(new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()),"Abgabe Projekt", "Abgabetermin für dieses Projekt",  "Type02")));
            log.info("Initial user-data: " + userRepository.save(new User("Alexander", "Schmidt","user1", "12345678",  "a.schmidt@gmail.com", false)));
        };
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

    }
}
