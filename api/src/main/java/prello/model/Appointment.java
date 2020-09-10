package prello.model;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @Column(name = "appointment_id", columnDefinition = "appointment_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String description;

    private String startTime;

    private String endTime;

    private String type;

    @ManyToMany
    @JoinTable(
            name= "user_appointment",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_ID"),
            inverseJoinColumns = @JoinColumn(name = "appointment_id", referencedColumnName = "appointment_id")
    )
    private List<User> member;

    public Appointment() {};

    public Appointment( String startTime, String endTime, String title, String description, String type){
        this.title = title;
        this.description = description;
        this.endTime = endTime;
        this.startTime = startTime;
        this.type = type;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long apmntID) {
        this.id = apmntID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String dateTime) {
        this.startTime = dateTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
