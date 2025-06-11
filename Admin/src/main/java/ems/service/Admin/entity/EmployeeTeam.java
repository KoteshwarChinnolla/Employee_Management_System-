package ems.service.Admin.entity;
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
import ems.service.Admin.dto.EmployeeDtoGen;
import ems.service.Admin.dto.EmployeeTeamDto;
import ems.service.Admin.dto.EmployeeTeamDtoGen;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "team_seq12")
    @SequenceGenerator(name = "team_seq12", sequenceName = "team_seq12", initialValue = 1, allocationSize = 1)
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
    private List<Projects> allProjects = new ArrayList<>();

    @Transient
    private Projects currentProject(){
        if(allProjects == null || allProjects.isEmpty()){
            return null;
        }
        for(Projects i: allProjects){
            if(i.getStatus().equalsIgnoreCase("In Progress") || i.getStatus().equalsIgnoreCase("Planning")){
                return i;
            }
        }
        return null;
    }

    
    @Transient
    public List<String> getTeamMembers() {
        List<String> teamMembers = new ArrayList<>();
        if (employees == null || employees.isEmpty()) {
            return teamMembers;
        }
        for (Employee employee : employees) {
            teamMembers.add(employee.getName());
        }
        return teamMembers;
    }

    @Transient
    public List<EmployeeDtoGen> getTeamsDtoGens() {
        List<EmployeeDtoGen> teamMembers = new ArrayList<>();
        if (employees == null || employees.isEmpty()) {
            return teamMembers;
        }
        for (Employee employee : employees) {
            teamMembers.add(employee.toDtoGen());
        }
        return teamMembers;
    }

    public EmployeeTeamDto toDto() {
        EmployeeTeamDto dto = new EmployeeTeamDto();
        List<String> employeeNames = getTeamMembers();
        dto.setEmployeeNames(employeeNames);
        Projects currentProject = currentProject();
        dto.setCurrentProject(currentProject != null ? currentProject.toDto() : null);
        dto.setTeamId(this.teamId);
        dto.setTeamName(this.teamName);
        dto.setTeamDescription(this.teamDescription);
        return dto;
    }

    public EmployeeTeamDtoGen toDtoGen() {
        EmployeeTeamDtoGen dto = new EmployeeTeamDtoGen();
        List<EmployeeDtoGen> employeeDtos = getEmployeeDtoGens();
        dto.setEmployee(employeeDtos);
        Projects currentProject = currentProject();
        dto.setCurrentProject(currentProject != null ? currentProject.toDto() : null);
        dto.setTeamId(this.teamId);
        dto.setTeamName(this.teamName);
        dto.setTeamDescription(this.teamDescription);
        return dto;
    }
}

// {
//     "teamId": 1,
//     "teamName": "Development Team",
//     "teamDescription": "Responsible for software development",
// }