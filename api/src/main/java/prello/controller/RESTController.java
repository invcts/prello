package prello.controller;

import org.springframework.web.bind.annotation.*;
import prello.exceptions.AppointmentNotFoundException;
import prello.exceptions.UserNotFoundException;
import prello.exceptions.WrongPasswordException;
import prello.model.Appointment;
import prello.model.User;
import prello.repository.AppointmentRepository;
import prello.repository.UserRepository;

@CrossOrigin("http://localhost:8090/")
@RequestMapping("prello")
@RestController
public class RESTController {

    private final AppointmentRepository repository;
    private final UserRepository userRepository;
    private User currentUser;

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
    public User userLogin(@RequestBody User user) {
        User loginUser = userRepository.findByUsername(user.getUsername());
        if (loginUser == null) throw new UserNotFoundException();
        if (loginUser.equals(user)){
            currentUser = loginUser;
            return loginUser;
        } else {
            throw new WrongPasswordException();
        }
    }

    @PostMapping("/logout")
    public boolean userLogout() {
        if (currentUser != null) {
            currentUser = null;
            return true;
        }
        return false;
    }

    @PostMapping("/user/app")
    public Iterable<Appointment> getAppForUser(@RequestBody User user) {
        User currentUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        return currentUser.getAppointments();
    }

    @PostMapping("/appointment/add")
    public Appointment addNewAppointment(@RequestBody Appointment appointment) {
       repository.save(appointment);
       appointment.addMember(currentUser);
       return repository.save(appointment);

    }
    @GetMapping("/user")
    public Iterable<User> getAllUser() {
        return userRepository.findAll();
    }

    @PostMapping("/user/add")
    public User addNewUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/appointment/{id}")
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

