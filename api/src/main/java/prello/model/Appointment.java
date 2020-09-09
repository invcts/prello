package prello.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String description;

    private String startTime;

    private String endTime;

    private String type;

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
