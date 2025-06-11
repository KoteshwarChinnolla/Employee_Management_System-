package ems.service.Admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ems.service.Admin.dto.AddProjectDto;
import ems.service.Admin.dto.TeamController;
import ems.service.Admin.entity.EmployeeTeam;
import ems.service.Admin.entity.Projects;
import ems.service.Admin.repository.ProjectsRepo;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Service
public class ProjectsService {
    
    @Autowired
    ProjectsRepo projectsRepo;

    public List<Projects> getAll(){
        return projectsRepo.findAll();
    }

    public Projects saveProject(AddProjectDto project) {
        if (project.getName() == null || project.getDescription() == null) {
            throw new IllegalArgumentException("Project name and description cannot be null");
        }
        Projects newProject = new Projects();
        newProject.setName(project.getName());
        newProject.setDescription(project.getDescription());
        newProject.setStartDate(project.getStartDate());
        newProject.setEndDate(project.getEndDate());
        newProject.setStatus(project.getStatus());
        newProject.setBudget(project.getBudget());
        newProject.setClientName(project.getClientName());
        newProject.setClientContact(project.getClientContact());
        newProject.setClientEmail(project.getClientEmail());
        newProject.setClientAddress(project.getClientAddress());
        newProject.setClientWebsite(project.getClientWebsite());
        TeamController employeeTeam = project.getEmployeeTeam();
        if (employeeTeam != null) {
            EmployeeTeam team = new EmployeeTeam();
            team.setTeamId(employeeTeam.getId());
            team.setTeamName(employeeTeam.getName());
            team.setTeamDescription(employeeTeam.getDescription());
            newProject.setEmployeeTeam(team);
        }
        return projectsRepo.save(newProject);
    }
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long Id;
    // @Column(name = "project_name")
    // private String name;
    // @Column(name = "project_description")
    // private String description;
    // @Column(name = "project_manager")
    // private String startDate;
    // @Column(name = "end_date")
    // private String endDate;
    // @Column(name = "status")
    // private String status;
    // @Column(name = "budget")
    // private String budget;
    // @Column(name = "client_name")
    // private String clientName;
    // @Column(name = "client_contact")
    // private String clientContact;
    // @Column(name = "client_email")
    // private String clientEmail;
    // @Column(name = "client_address")
    // private String clientAddress;
    // @Column(name = "client_website")
    // private String clientWebsite;

    // @ManyToOne
    // @JoinColumn(name = "team_id", referencedColumnName = "teamId")
    // @JsonBackReference
    // EmployeeTeam employeeTeam;
    public Projects getProject(Long id) {
        return projectsRepo.findById(id).orElse(null);
    }

    public Projects updateProject(Projects project) {
        if (project.getId() == null || !projectsRepo.existsById(project.getId())) {
            throw new IllegalArgumentException("Project with given ID does not exist");
        }
        return projectsRepo.save(project);
    }

    public void deleteProject(Long id) {
        projectsRepo.deleteById(id);
    }
}
