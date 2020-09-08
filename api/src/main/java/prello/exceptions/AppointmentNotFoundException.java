package prello.exceptions;

public class AppointmentNotFoundException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public AppointmentNotFoundException() {
        super("Appointment does not exist");
    }
}
