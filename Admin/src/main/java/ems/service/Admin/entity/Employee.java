package ems.service.Admin.entity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import ems.service.Admin.dto.ContactDto;
import ems.service.Admin.dto.EmployeeDto;
import ems.service.Admin.dto.EmployeeDtoGen;
import ems.service.Admin.dto.EmployeeTeamDto;
import ems.service.Admin.dto.ProjectDto;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employee",
    schema = "ems", 
    // uniqueConstraints = {
    //     @UniqueConstraint(columnNames = {"phone_number", "email"})
    // },
    indexes = {
        @Index(name = "employee_name", columnList = "name"),
        @Index(name = "employee_phone_number_Email", columnList = "phone_number, email")
    }
)
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee_seq2")
    @SequenceGenerator(name= "employee_seq3", sequenceName = "emp_seq3", initialValue = 1, allocationSize = 1)
    private Long id;


    @Column(name = "version")
    @Version
    private int version;

    @Column(name="name", nullable = false)
    private String name;
    // @Column(name="phone_number", unique = true, length = 10)
    @Column(name = "phone_number", nullable = false, length = 10)
    private String phoneNumber;

    @Column(name = "email",nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "department", nullable = false)
    private String department;

    // needs to be updated
    @Column(name = "position", nullable = false)
    private String position;

    @Column(name = "join_date", nullable = false)
    private String joinDate;

    @Column(name = "skills", nullable = true)
    List<String> skills;

    // @ManyToOne
    // @JoinColumn(name = "employee_team_id", referencedColumnName = "teamId")
    // // @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "teamId")
    // @JsonBackReference
    // private EmployeeTeam employeeTeam;

    // // 2025-06-01T01:12:13.564+05:30  WARN 17744 --- [springPostgress] [nio-8080-exec-3] .c.j.MappingJackson2HttpMessageConverter : Failed to evaluate Jackson deserialization for type [[simple type, class ems.service.Admin.entity.Employee]]: com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Cannot handle managed/back reference 'defaultReference': no back reference property found from type `java.util.List<ems.service.Admin.entity.Achivements>`


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employee")
    @JsonManagedReference
    private List<Achivements> achievements;

    @ManyToMany
    @JoinTable(
        name = "employeeID_teamsID",
        schema = "ems",
        joinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "team_id", referencedColumnName = "teamId")
    )
    @JsonIgnore
    private List<EmployeeTeam> employeeTeams = new ArrayList<>();

    public EmployeeTeamDto getCurrentTeam(){
        if(employeeTeams != null && !employeeTeams.isEmpty()) {
            return employeeTeams.get(0).toDto();
        }
        return null;
    }

    // @Transient
    public List<EmployeeTeamDto> getAllTeams(){
        if(employeeTeams != null && !employeeTeams.isEmpty()) {
            return employeeTeams.stream()
                .map(EmployeeTeam::toDto)
                .toList();
        }
        return Collections.emptyList();
    }

    // @Transient
    // private EmployeeTeam employeeTeam;

    // public EmployeeTeam getEmployeeTeam() {
    //     if (employeeTeam == null) {
    //         employeeTeam = getCurrentTeam();
    //     }
    //     return employeeTeam;
    // }
    // @Transient
    public List<ProjectDto> getProjects(){
        EmployeeTeam CurrentEmployeeTeam = employeeTeams.size() > 0 ? employeeTeams.get(0) : null;
        if(CurrentEmployeeTeam  != null) {
            return CurrentEmployeeTeam.getAllProjects().stream()
                .map(project -> project.toDto())
                .toList();
        }
        return Collections.emptyList();
    }

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Tickets> tickets;
    
    public EmployeeDto toDto() {
        EmployeeTeam CurrentEmployeeTeam = employeeTeams.size() > 0 ? employeeTeams.get(0) : null;
        EmployeeDto dto = new EmployeeDto();
        ContactDto contactDto = new ContactDto();
        contactDto.setPhoneNumber(this.phoneNumber);
        contactDto.setEmail(this.email);
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setPassword(this.password);
        dto.setRole(this.role);
        dto.setEmail(this.email);
        dto.setDepartment(this.department);
        dto.setPosition(this.position);
        dto.setTeam(CurrentEmployeeTeam != null ? CurrentEmployeeTeam.toDto() : null);
        dto.setJoinDate(this.joinDate);
        dto.setContact(contactDto); // Assuming address is not set
        dto.setSkills(this.skills);
        dto.setEmployeeTeam(CurrentEmployeeTeam != null ? CurrentEmployeeTeam.getEmployeeDtoGens() : null);
        dto.setAchivements(this.achievements);
        dto.setProjects(this.getProjects());
        return dto;
    }

    public EmployeeDtoGen toDtoGen() {
        EmployeeDtoGen dtoGen = new EmployeeDtoGen();
        EmployeeTeam CurrentEmployeeTeam = employeeTeams.size() > 0 ? employeeTeams.get(0) : null;
        dtoGen.setId(this.id);
        dtoGen.setName(this.name);
        dtoGen.setEmail(this.email);
        dtoGen.setPosition(this.position);
        if (CurrentEmployeeTeam != null) {
            dtoGen.setEmployeeTeam(CurrentEmployeeTeam.getTeamName());
        }
        return dtoGen;
    }

    public void addTeam(EmployeeTeam employeeTeam) {
        this.employeeTeams.add(employeeTeam);
    }

}