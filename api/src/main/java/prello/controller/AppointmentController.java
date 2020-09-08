package prello.controller;

import org.springframework.web.bind.annotation.*;
import prello.exceptions.AppointmentNotFoundException;
import prello.model.Appointment;
import prello.repository.AppointmentRepository;

@RequestMapping("appointments")
@RestController
public class AppointmentController {

    private final AppointmentRepository repository;

    public AppointmentController(AppointmentRepository repository){
        this.repository = repository;
    };

    @GetMapping
    public Iterable<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    @GetMapping("{id}")
    public Appointment getAppointment(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(AppointmentNotFoundException::new);
    }

    @PostMapping
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return repository.save(appointment);
    }

    @PutMapping("{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment) {
        Appointment appointmentToUpdate = repository.findById(id).orElseThrow(AppointmentNotFoundException::new);

        appointmentToUpdate.setDateTime(appointment.getDateTime());
        appointmentToUpdate.setDescription(appointment.getDescription());
        appointmentToUpdate.setStatus(appointment.getStatus());
        appointmentToUpdate.setType(appointment.getType());

        return repository.save(appointmentToUpdate);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        repository.findById(id).orElseThrow(AppointmentNotFoundException::new);
        repository.deleteById(id);
    }
}

