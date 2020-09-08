package prello.repository;

import org.springframework.data.repository.CrudRepository;
import prello.model.Appointment;

public interface AppointmentRepository extends CrudRepository<Appointment, Long> {

}
