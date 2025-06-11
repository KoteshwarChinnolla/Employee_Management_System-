package ems.service.Admin.service;

import java.util.stream.Collectors;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ems.service.Admin.dto.EmployeeDtoGen;
import ems.service.Admin.dto.TeamController;
import ems.service.Admin.entity.Employee;
import ems.service.Admin.entity.EmployeeTeam;
import ems.service.Admin.entity.Projects;
import ems.service.Admin.repository.EmployeeRepo;
import ems.service.Admin.repository.EmployeeTeamRepo;
import ems.service.Admin.repository.ProjectsRepo;

@Service
public class EmployeeTeamService {

    @Autowired
    private EmployeeTeamRepo employeeTeamRepo;

    @Autowired
    private ProjectsRepo projectsRepo;

    @Autowired
    EmployeeRepo employeeRepo;

    public List<EmployeeTeam> getAll() {
        return employeeTeamRepo.findAll();
    }

    public EmployeeTeam saveEmployeeTeam(TeamController employeeTeam) {

        System.out.println("Received eamployee team for saving: " + employeeTeam.getName() + " with description: " + employeeTeam.getDescription() 
                + " and projects: " + (employeeTeam.getAllProjects() != null ? employeeTeam.getAllProjects().toString() : "[]")
                + " and employees: " + (employeeTeam.getAllEmployees() != null ? employeeTeam.getAllEmployees().toString() : "[]"));

        // Extract project IDs safely
        List<Long> projectIds = employeeTeam.getAllProjects() != null
                ? employeeTeam.getAllProjects()
                :Collections.emptyList();

        // Fetch projects from DB
        List<Projects> existingProjects = projectIds.isEmpty()
                ? Collections.emptyList()
                : projectsRepo.findAllById(projectIds);

        List<Long> employeeIds = employeeTeam.getAllEmployees() != null
                ? employeeTeam.getAllEmployees()
                : Collections.emptyList();

        List<Employee> existingEmployees = employeeIds.isEmpty()
                ? Collections.emptyList()
                : employeeRepo.findAllById(employeeIds);

        // Set both sides of the relationship properly
        EmployeeTeam employeeTeamEntity = new EmployeeTeam();
        employeeTeamEntity.setTeamName(employeeTeam.getName());
        employeeTeamEntity.setTeamDescription(employeeTeam.getDescription() != null ? employeeTeam.getDescription() : "");
        employeeTeamEntity.setAllProjects(existingProjects);
        employeeTeamEntity.setEmployees(existingEmployees);
        EmployeeTeam savedEmployeeTeam = employeeTeamRepo.save(employeeTeamEntity);
        System.out.println("Employee Team saved with ID: " + savedEmployeeTeam.getTeamId());
        for (Projects project : existingProjects) {
            project.setEmployeeTeam(savedEmployeeTeam);
            projectsRepo.save(project);
            System.out.println("Project saved with ID: " + project.getId() + " and associated with Employee Team ID: " + savedEmployeeTeam.getTeamId());
        }
        for (Employee employee : existingEmployees) {
            employee.getEmployeeTeams().add(savedEmployeeTeam);
            employeeRepo.save(employee);
            System.out.println("Employee saved with ID: " + employee.getId() + " and associated with Employee Team ID: " + savedEmployeeTeam.getTeamId());
        }
        // Save team
        return savedEmployeeTeam;
    }

    public EmployeeTeam getEmployeeTeam(Long id) {
        return employeeTeamRepo.findById(id).orElse(null);
    }

    public EmployeeTeam updateEmployeeTeam(TeamController employeeTeam) {
        if (employeeTeam.getId() == null || !employeeTeamRepo.existsById(employeeTeam.getId())) {
            throw new IllegalArgumentException("Employee Team with given ID does not exist");
        }
        EmployeeTeam existingTeam = employeeTeamRepo.findById(employeeTeam.getId()).orElseThrow(
            () -> new IllegalArgumentException("Employee Team with ID " + employeeTeam.getId() + " does not exist"));
        for(Employee employee : existingTeam.getEmployees()) {
            if(employee.getEmployeeTeams() == null) {
                employee.setEmployeeTeams(new java.util.ArrayList<>());
            }
            if(employee.getEmployeeTeams().contains(existingTeam)) {
                employee.getEmployeeTeams().remove(existingTeam);
                employeeRepo.save(employee);
            }
        }
        // Update team details
        existingTeam.setTeamName(employeeTeam.getName());
        existingTeam.setTeamDescription(employeeTeam.getDescription() != null ? employeeTeam.getDescription() : "");
        // Update projects
        List<Long> projectIds = employeeTeam.getAllProjects() != null
                ? employeeTeam.getAllProjects():Collections.emptyList();

        // Fetch projects from DB
        List<Projects> existingProjects = projectIds.isEmpty()
                ? Collections.emptyList()
                : projectsRepo.findAllById(projectIds);

        List<Long> employeeIds = employeeTeam.getAllEmployees() != null
                ? employeeTeam.getAllEmployees()
                : Collections.emptyList();

        List<Employee> existingEmployees = employeeIds.isEmpty()
                ? Collections.emptyList()
                : employeeRepo.findAllById(employeeIds);
                
        existingTeam.setAllProjects(existingProjects);
        existingTeam.setEmployees(existingEmployees);
        // Save updated team
        EmployeeTeam savedEmployeeTeam = employeeTeamRepo.save(existingTeam);
        for (Projects project : existingProjects) {
            project.setEmployeeTeam(savedEmployeeTeam);
            projectsRepo.save(project);
            System.out.println("Project saved with ID: " + project.getId() + " and associated with Employee Team ID: " + savedEmployeeTeam.getTeamId());
        }
        for (Employee employee : existingEmployees) {
            if( employee.getEmployeeTeams() == null) {
                employee.setEmployeeTeams(new java.util.ArrayList<>());
            }
            if(!employee.getEmployeeTeams().contains(savedEmployeeTeam)) employee.getEmployeeTeams().add(savedEmployeeTeam);
            employeeRepo.save(employee);
            System.out.println("Employee saved with ID: " + employee.getId() + " and associated with Employee Team ID: " + savedEmployeeTeam.getTeamId());
        }
        return savedEmployeeTeam; // reuse same logic to safely rebind projects
    }

    public EmployeeTeam updateEmployeeTeam_(TeamController employeeTeam) {
        if (employeeTeam.getId() == null || !employeeTeamRepo.existsById(employeeTeam.getId())) {
            throw new IllegalArgumentException("Employee Team with given ID does not exist");
        }

        EmployeeTeam existingTeam = new EmployeeTeam();
        existingTeam.setTeamId(employeeTeam.getId());
        existingTeam.setTeamName(employeeTeam.getName());
        existingTeam.setTeamDescription(employeeTeam.getDescription() != null ? employeeTeam.getDescription() : "");
        List<Long> projectIds = employeeTeam.getAllProjects() != null
                ? employeeTeam.getAllProjects()
                :Collections.emptyList();

        // Fetch projects from DB
        List<Projects> existingProjects = projectIds.isEmpty()
                ? Collections.emptyList()
                : projectsRepo.findAllById(projectIds);

        List<Long> employeeIds = employeeTeam.getAllEmployees() != null
                ? employeeTeam.getAllEmployees()
                : Collections.emptyList();

        List<Employee> existingEmployees = employeeIds.isEmpty()
                ? Collections.emptyList()
                : employeeRepo.findAllById(employeeIds);

        existingTeam.setAllProjects(existingProjects);
        existingTeam.setEmployees(existingEmployees);
        // Save updated team
        EmployeeTeam savedEmployeeTeam = employeeTeamRepo.save(existingTeam);
        for (Projects project : existingProjects) {
            project.setEmployeeTeam(savedEmployeeTeam);
            projectsRepo.save(project);
            System.out.println("Project saved with ID: " + project.getId() + " and associated with Employee Team ID: " + savedEmployeeTeam.getTeamId());
        }
        for (Employee employee : existingEmployees) {
            employee.getEmployeeTeams().add(savedEmployeeTeam);
            employeeRepo.save(employee);
            System.out.println("Employee saved with ID: " + employee.getId() + " and associated with Employee Team ID: " + savedEmployeeTeam.getTeamId());
        }
        return savedEmployeeTeam;

    }

    public void deleteEmployeeTeam(Long id) {
        employeeTeamRepo.deleteById(id);
    }
}
