package prello.controller;

import org.springframework.web.bind.annotation.*;
import prello.exceptions.AppointmentNotFoundException;
import prello.exceptions.UserNotFoundException;
import prello.model.Appointment;
import prello.model.User;
import prello.repository.AppointmentRepository;
import prello.repository.UserRepository;

@RequestMapping("prello")
@RestController
public class RESTController {

    private final AppointmentRepository repository;
    private final UserRepository userRepository;

    public RESTController(AppointmentRepository repository, UserRepository userRepository){
        this.repository = repository;
        this.userRepository = userRepository;
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

    @PostMapping("/login")
    public boolean userLogin(@RequestBody User user) {
        User loginUser = userRepository.findByUsername(user.getUsername());
        return loginUser.equals(user);
    }
    @GetMapping("/user")
    public Iterable<User> getAllUser() {
        return userRepository.findAll();
    }

    @PutMapping("{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment) {
        Appointment appointmentToUpdate = repository.findById(id).orElseThrow(AppointmentNotFoundException::new);

        appointmentToUpdate.setStartTime(appointment.getStartTime());
        appointmentToUpdate.setEndTime(appointment.getEndTime());
        appointmentToUpdate.setDescription(appointment.getDescription());
        appointmentToUpdate.setType(appointment.getType());

        return repository.save(appointmentToUpdate);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        repository.findById(id).orElseThrow(AppointmentNotFoundException::new);
        repository.deleteById(id);
    }
}

