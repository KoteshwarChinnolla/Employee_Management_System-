package koti.ems.springPostgress.service;

import java.util.stream.Collectors;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import koti.ems.springPostgress.entity.EmployeeTeam;
import koti.ems.springPostgress.entity.Projects;
import koti.ems.springPostgress.repository.EmployeeTeamRepo;
import koti.ems.springPostgress.repository.ProjectsRepo;

@Service
public class EmployeeTeamService {

    @Autowired
    private EmployeeTeamRepo employeeTeamRepo;

    @Autowired
    private ProjectsRepo projectsRepo;

    public List<EmployeeTeam> getAll() {
        return employeeTeamRepo.findAll();
    }

    public EmployeeTeam getTeamByName(String name) {
        return employeeTeamRepo.findByName(name);
    }

    public EmployeeTeam saveEmployeeTeam(EmployeeTeam employeeTeam) {

        System.out.println("Received eamployee team for saving: " + employeeTeam);

        // Extract project IDs safely
        List<Long> projectIds = employeeTeam.getAllProjects() != null
                ? employeeTeam.getAllProjects().stream()
                    .map(project -> project.getId())
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList())
                : Collections.emptyList();
        System.out.println("Project IDs to be associated: " + projectIds);

        // Fetch projects from DB
        List<Projects> existingProjects = projectIds.isEmpty()
                ? Collections.emptyList()
                : projectsRepo.findAllById(projectIds);

        // Set both sides of the relationship properly
        
        employeeTeam.setAllProjects(existingProjects);
        EmployeeTeam savedEmployeeTeam = employeeTeamRepo.save(employeeTeam);
        System.out.println("Employee Team saved with ID: " + savedEmployeeTeam.getTeamId());
        for (Projects project : existingProjects) {
            project.setEmployeeTeam(savedEmployeeTeam);
            projectsRepo.save(project);
            System.out.println("Project saved with ID: " + project.getId() + " and associated with Employee Team ID: " + savedEmployeeTeam.getTeamId());
        }
        // Save team
        return savedEmployeeTeam;
    }

    public EmployeeTeam getEmployeeTeam(Long id) {
        return employeeTeamRepo.findById(id).orElse(null);
    }

    public EmployeeTeam updateEmployeeTeam(EmployeeTeam employeeTeam) {
        if (employeeTeam.getTeamId() == null || !employeeTeamRepo.existsById(employeeTeam.getTeamId())) {
            throw new IllegalArgumentException("Employee Team with given ID does not exist");
        }
        return saveEmployeeTeam(employeeTeam); // reuse same logic to safely rebind projects
    }

    public void deleteEmployeeTeam(Long id) {
        employeeTeamRepo.deleteById(id);
    }
}
