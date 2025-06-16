package ems.service.Admin.entity;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import ems.service.Admin.dto.ProjectDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "projects", schema = "ems")
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE, region = "defaultCache")
public class Projects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(name = "project_name")
    private String name;
    @Column(name = "project_description")
    private String description;
    @Column(name = "project_manager")
    private String startDate;
    @Column(name = "end_date")
    private String endDate;
    @Column(name = "status")
    private String status;
    @Column(name = "budget")
    private String budget;
    @Column(name = "client_name")
    private String clientName;
    @Column(name = "client_contact")
    private String clientContact;
    @Column(name = "client_email")
    private String clientEmail;
    @Column(name = "client_address")
    private String clientAddress;
    @Column(name = "client_website")
    private String clientWebsite;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "teamId")
    @JsonBackReference
    EmployeeTeam employeeTeam;



    public ProjectDto toDto() {
        ProjectDto dto = new ProjectDto();
        dto.setId(this.Id);
        dto.setName(this.name);
        dto.setDescription(this.description);
        dto.setStartDate(this.startDate);
        dto.setEndDate(this.endDate);
        return dto;
    }
}
// {
//     "Id": 1,
//     "name": "Project Alpha",
//     "description": "A new project to develop a web application",
//     "startDate": "2023-01-01",
//     "endDate": "2023-12-31",
//     "status": "In Progress",
//     "budget": "100000",
//     "clientName": "Tech Solutions Inc.",
//     "clientContact": "+1-555-1234",
//     "clientEmail": "example@gmail.com",
//     "clientAddress": "123 Tech Street, Silicon Valley",
//     "clientWebsite": "www.techsolutions.com"
//     "employeeTeam": {
//         "teamId": 1,
//         "teamName": "Development Team"
//     }
// }