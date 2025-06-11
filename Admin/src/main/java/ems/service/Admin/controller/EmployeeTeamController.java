package ems.service.Admin.controller;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ems.service.Admin.dto.AddEmployeesAndProjectsTeam;
import ems.service.Admin.dto.EmployeeTeamDto;
import ems.service.Admin.dto.EmployeeTeamDtoGen;
import ems.service.Admin.dto.TeamController;
import ems.service.Admin.entity.EmployeeTeam;
import ems.service.Admin.service.EmployeeTeamService;

@RestController
@RequestMapping("/admin/employeeTeam")
public class EmployeeTeamController {

    @Autowired
    EmployeeTeamService EmployeeTeamService;

    @PostMapping("/postEmployeeTeam")
    public EmployeeTeam postEmployeeTeam(@RequestBody TeamController employeeTeam) {
        System.out.println("Received employee team for saving: " + employeeTeam.getName() +
            " with description: " + employeeTeam.getDescription() +
            " and projects: " + employeeTeam.getAllProjects()+
            " and employees: " + employeeTeam.getAllEmployees());
        EmployeeTeam employeeTeamResult = EmployeeTeamService.saveEmployeeTeam(employeeTeam);
        return employeeTeamResult;
    }
    

    @GetMapping("/getAll")
    public List<EmployeeTeamDto> getAll(){
        return EmployeeTeamService.getAll().stream()
            .map(EmployeeTeam::toDto)
            .toList();
    }

    @GetMapping("/getEmployeeTeam/{id}")
    public EmployeeTeamDtoGen getEmployeeTeam(@PathVariable Long id) {
        EmployeeTeam employeeTeam = EmployeeTeamService.getEmployeeTeam(id);
        if (employeeTeam == null) {
            throw new IllegalArgumentException("Employee Team with ID " + id + " does not exist");
        }
        return employeeTeam.toDtoGen();
    }

    @PostMapping("/updateEmployeeTeam")
    public EmployeeTeam updateEmployeeTeam(@RequestBody TeamController employeeTeam) {
        System.out.println("Updating Employee Team with ID: " + employeeTeam.getId());
        EmployeeTeam updatedEmployeeTeam = EmployeeTeamService.updateEmployeeTeam(employeeTeam);
        return updatedEmployeeTeam;
    }

    @GetMapping("/deleteEmployeeTeam/{id}")
    public String deleteEmployeeTeam(@PathVariable Long id) {
        EmployeeTeamService.deleteEmployeeTeam(id);
        return "Employee Team with ID: " + id + " deleted successfully";
    }
}
