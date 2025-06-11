package koti.ems.springPostgress.entity;
import java.beans.Transient;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import koti.ems.springPostgress.dto.EmployeeDtoGen;
import koti.ems.springPostgress.dto.EmployeeTeamDto;
import koti.ems.springPostgress.dto.TeamDto;
import jakarta.persistence.OneToMany;
import jakarta.persistence.FetchType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "employee_team", schema = "ems")
@Entity

public class EmployeeTeam {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "team_seq1")
    @SequenceGenerator(name = "team_seq1", sequenceName = "team_seq1", initialValue = 1, allocationSize = 1)
    private Long teamId;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "team_description")
    private String teamDescription;


    // @OneToMany(mappedBy = "employeeTeam", cascade = CascadeType.ALL)
    // // @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    // @JsonIgnore
    // private List<Employee> employees;
    @ManyToMany(mappedBy = "employeeTeams")
    @JsonManagedReference
    private List<Employee> employees = new ArrayList<>();
    
    public List<EmployeeDtoGen> getEmployeeDtoGens() {
        return employees == null ? null : employees.stream()
            .map(Employee::toDtoGen)
            .toList();
    }

    @OneToMany(mappedBy = "employeeTeam", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private List<Projects> allProjects;

    @Transient
    private Projects currentProject(){
        for(Projects i: allProjects){
            if(i.getStatus().equalsIgnoreCase("In Progress") || i.getStatus().equalsIgnoreCase("Planning")){
                return i;
            }
        }
        return null;
    }

    public Projects getCurrentProject() {
        return currentProject();
    }

    public EmployeeTeamDto toDto() {
        EmployeeTeamDto dto = new EmployeeTeamDto();
        Projects currentProject = currentProject();
        List<String> names = new ArrayList<>();
        if (employees != null) {
            for (Employee employee : employees) {
                names.add(employee.getName());
            }
        }
        dto.setCurrentProject(currentProject != null ? currentProject.toDto() : null);
        dto.setTeamId(this.teamId);
        dto.setTeamName(this.teamName);
        dto.setTeamDescription(this.teamDescription);
        dto.setTeamMembers(names);
        return dto;
    }

    public TeamDto getTeamDto() {
        TeamDto dto = new TeamDto();
        dto.setTeamId(this.teamId);
        dto.setTeamName(this.teamName);
        dto.setTeamDescription(this.teamDescription);
        Projects currentProject = currentProject();
        dto.setCurrentProject(currentProject != null ? currentProject.toDto() : null);
        List<EmployeeDtoGen> employeeDtos = getEmployeeDtoGens();
        dto.setTeamMembers(employeeDtos != null ? employeeDtos : new ArrayList<>());
        dto.setPastProjects(allProjects != null ? allProjects.stream().map(Projects::toDto).toList() : new ArrayList<>());
        return dto;
    }
}
