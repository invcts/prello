package prello.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import prello.model.User;
import prello.repository.AppointmentRepository;

import javax.persistence.Access;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    /*public Iterable<User> findAllUser(Long id) {
        return
    }*/
}
