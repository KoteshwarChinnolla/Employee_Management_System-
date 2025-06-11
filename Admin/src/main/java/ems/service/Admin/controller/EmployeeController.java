package ems.service.Admin.controller;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import ems.service.Admin.dto.EmployeeControllerDto;
import ems.service.Admin.dto.EmployeeControllerIdDto;
import ems.service.Admin.dto.EmployeeDto;
import ems.service.Admin.entity.Employee;
import ems.service.Admin.service.EmployeeService;
import ems.service.Admin.service.EmployeeTeamService;


@RestController
@RequestMapping("/admin/employee")
public class EmployeeController {
    
    @Autowired
    EmployeeService EmployeeService;

    @Autowired
    EmployeeTeamService EmployeeTeamService;

    @GetMapping("/getAll")
    public List<Employee> getAll() {
        return EmployeeService.getAll();
    }
    @GetMapping("/GetEmployeeId/{name}")
    public Long GetEmployeeId(@PathVariable String name) {
        name = name.replace("-", " ");
        System.out.println("Fetching Employee with Name: " + name);
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee.getId();
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }
    

    @GetMapping("/getEmployeebyId")
    public EmployeeDto getEmployee(@RequestParam(name = "id") Long id, @RequestParam(name = "password") String password) {
        System.out.println("Fetching Employee with ID: " + id);
        Employee employee = EmployeeService.getEmployeeDetails(id);
        if (employee == null) {
            throw new IllegalArgumentException("Employee with ID " + id + " does not exist");
        }
        EmployeeDto employeeDto = employee.toDto();
        if(employeeDto.getPassword().equals(password)) {
            return employeeDto;
        } else {
            throw new IllegalArgumentException("Invalid password for Employee ID: " + id);
        }
    }

    @GetMapping("/getEmployeeByName/{name}")
    public Employee getEmployeeByName(@PathVariable String name) {
        name = name.replace("-", " ");
        System.out.println("Fetching Employee with Name: " + name);
        Employee employee = EmployeeService.getEmployeeByName(name);
        if (employee != null) {
            return employee;
        } else {
            throw new IllegalArgumentException("Employee with name " + name + " does not exist");
        }
    }

    @PostMapping("/postEmployee")
    public String postEmployee(@RequestBody EmployeeControllerDto employee) {
    //   {
    //     "version": 1,
    //     "name": "Kara Stone",
    //     "phoneNumber": "9876543220",
    //     "email": "kara11@example.com",
    //     "password": "pass123",
    //     "role": "Developer",
    //     "department": "Engineering",
    //     "position": "Team Lead",
    //     "joinDate": "2023-08-15",
    //     "skills": ["Java", "Spring"],
    //     "employeeTeams": [{ "teamId": 1 }, { "teamId": 4 }, { "teamId": 5 }]
    //   }
        System.out.println("Received Employee: " + employee.getName() + ", " + employee.getPhoneNumber() + ", " + employee.getEmployeeTeams());
        Employee savedEmployee = EmployeeService.saveEmployee(employee);
        return "Employee saved with ID: " + savedEmployee.getId();
    }

    @PostMapping("/postEmployeeList")
    public String postEmployeeList(@RequestBody List<EmployeeControllerDto> employees) {
        System.out.println("Received Employee List: " + employees.size());
        for ( EmployeeControllerDto employee : employees) {
            System.out.println("Received Employee: " + employee.getName() + ", " + employee.getPhoneNumber() + ", " + employee.getEmployeeTeams());
            Employee savedEmployee = EmployeeService.saveEmployee(employee);
            System.out.println("Employee saved with ID: " + savedEmployee.getId());
        }
        return "Employees saved successfully";
    }

    @PostMapping(value = "/updateEmployee")
    public String updateEmployee(@RequestBody EmployeeControllerIdDto employee) {
        // System.out.println("Updating Employee with ID: " + employee.getId() + ", EMployee Team ID: " + employee.getEmployeeTeam().getTeamId());
        //   {
        //     "id":1,
        //     "version": 1,
        //     "name": "chinnolla koteshwar",
        //     "phoneNumber": "9876543220",
        //     "email": "kara11@example.com",
        //     "password": "pass123",
        //     "role": "Developer",
        //     "department": "Engineering",
        //     "position": "Team Lead",
        //     "joinDate": "2023-08-15",
        //     "skills": ["Java", "Spring"],
        //     "employeeTeams": [{ "teamId": 1 }, { "teamId": 4 }, { "teamId": 5 }]
        //   }
        Employee updatedEmployee = EmployeeService.updateEmployee(employee);
        return "Employee updated with ID: " + updatedEmployee.getId();
    }

    @GetMapping("/deleteEmployee/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        EmployeeService.deleteEmployee(id);
        return "Employee with ID: " + id + " deleted successfully";
    }
}