package prello.controller;

import org.springframework.web.bind.annotation.*;
import prello.exceptions.AppointmentNotFoundException;
import prello.model.Appointment;
import prello.repository.AppointmentRepository;

@RequestMapping
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

    @GetMapping("{apmntID}")
    public Appointment getAppointment(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(AppointmentNotFoundException::new);
    }

    @PostMapping
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return repository.save(appointment);
    }
}

