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

@Configuration
public class LoadDatabase implements ApplicationListener<ContextRefreshedEvent> {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(AppointmentRepository appointmentRepository, UserRepository userRepository) {
        return args -> {
            log.info("Initial data: " + appointmentRepository.save(new Appointment("Abgabe Projekt", "Abgabetermin für dieses Projekt", "14-09-2020 10:00:00", "14-09-2020 10:00:00", "Type02")));
            log.info("Initial user-data: " + userRepository.save(new User("user1", "12345678", "Alexander", "Schmidt")));
        };
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

    }
}
