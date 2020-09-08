package prello.DatabaseLoader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import prello.model.Appointment;
import prello.repository.AppointmentRepository;

@Configuration
public class LoadDatabase implements ApplicationListener<ContextRefreshedEvent> {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(AppointmentRepository repository) {
        return args -> {
            log.info("Initial data: " + repository.save(new Appointment("Abgabe Projekt", "Abgabetermin für dieses Projekt", "Montag 10 Uhr")));
        };
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

    }
}
