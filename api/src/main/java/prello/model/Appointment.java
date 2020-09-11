package prello.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;


@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @Column(name = "ApmntID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String description;

    @Column(name = "start_time")
    private Timestamp startTime;

    @Column(name = "end_time")
    private Timestamp endTime;

    private String type;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name= "user_appointments",
            joinColumns = @JoinColumn(name = "UserID"),
            inverseJoinColumns = @JoinColumn(name = "ApmntID")
    )
    @JsonIgnore
    private List<User> member = new LinkedList();

    public Appointment() {};

    public Appointment(Timestamp startTime, Timestamp endTime, String title, String description, String type){
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

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp dateTime) {
        this.startTime = dateTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public List<User> getMember() {
        return member;
    }

    public void setMember(List<User> member) {
        this.member = member;
    }

    public void addMember(User user) {
        this.member.add(user);
    }

    public void removeMember(User user){
        this.member.remove(user);
    }
}
