package prello.model;

import javax.persistence.*;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @Column(name ="TeamID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String Description;

    public Team() {
    }

    public Team(String name, String description) {
        this.name = name;
        Description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }
}
