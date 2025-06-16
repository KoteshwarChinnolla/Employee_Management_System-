package koti.ems.springPostgress.controller;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import koti.ems.springPostgress.dto.EmployeeControllerDto;
import koti.ems.springPostgress.dto.EmployeeDto;
import koti.ems.springPostgress.dto.EmployeeDtoGen;
import koti.ems.springPostgress.dto.TeamDto;
import koti.ems.springPostgress.entity.Achivements;
import koti.ems.springPostgress.entity.Employee;
import koti.ems.springPostgress.entity.Projects;
import koti.ems.springPostgress.service.EmployeeService;
import koti.ems.springPostgress.service.EmployeeTeamService;


@RestController
@RequestMapping("/employee/employee")
public class EmployeeController {
    
    @Autowired
    EmployeeService EmployeeService;

    @Autowired
    EmployeeTeamService EmployeeTeamService;



    @GetMapping("/getAll")
    public List<EmployeeDtoGen> getAll() {
        return EmployeeService.getAll().stream()
        .map(Employee::toDtoGen)
        .toList();
    }

    @GetMapping("/getEmployeeByName/{name}")
    public EmployeeDto getEmployeeByName(@PathVariable String name) {
        name = name.replace("-", " ");
        System.out.println("Fetching Employee with Name: " + name);
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee.toDto();
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }

    @GetMapping("/getEmployeeToEdit/{name}/edit")
    public Employee getEmployeeToEdit(@PathVariable String name) {
        name = name.replace("-", " ");
        System.out.println("Fetching Employee with Name: " + name);
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee;
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }

    @PostMapping("/updateEmployee")
    public String updateEmployee(@RequestBody Employee employee) {
        // System.out.println("Updating Employee with ID: " + employee.getId() + ", EMployee Team ID: " + employee.getEmployeeTeam().getTeamId());
        Employee updatedEmployee = EmployeeService.updateEmployee(employee);
        return "Employee updated with ID: " + updatedEmployee.getId();
    }

    @GetMapping("/getEmployeeTeam/{name}")
    public TeamDto getEmployeeTeam(@PathVariable String name) {
        name = name.replace("-", " ");
        System.out.println("Fetching Employee Team for Employee with Name: " + name);
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee.getTeamByDto();
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }

    @GetMapping("/AllEmployeeTeams/{name}")
    public List<TeamDto> AllEmployeeTeams(@PathVariable String name) {
        name = name.replace("-", " ");
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee.getAllTeams();
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }

    @GetMapping("/getProject/{name}")
    public Projects getProject(@PathVariable String name) {
        name = name.replace("-", " ");
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee.getProjectsDetail();
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }

    @GetMapping("/getAllProjects/{name}")
    public List<Projects> getAllProjects(@PathVariable String name) {
        name = name.replace("-", " ");
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee.getProjectsList();
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }

    @GetMapping("/Achivements/{name}")
    public List<Achivements> Achivements(@PathVariable String name) {
        name = name.replace("-", " ");
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee.getAchievements();
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }

    @GetMapping("/getEmployeeId/{name}")
    public Long getEmployeeId(@PathVariable String name) {
        name = name.replace("-", " ");
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee.getId();
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }

}