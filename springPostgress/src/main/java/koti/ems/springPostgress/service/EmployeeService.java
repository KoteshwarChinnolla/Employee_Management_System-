package koti.ems.springPostgress.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import koti.ems.springPostgress.dto.EmployeeControllerDto;
import koti.ems.springPostgress.entity.Employee;
import koti.ems.springPostgress.entity.EmployeeTeam;
import koti.ems.springPostgress.repository.EmployeeRepo;
import koti.ems.springPostgress.repository.EmployeeTeamRepo;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepo employeeRepo;

    @Autowired
    EmployeeTeamRepo employeeTeamRepo;

    public List<Employee> getAll() {
        return employeeRepo.findAll();
    }

    public Employee getEmployeeDetails(Long id) {
        Employee employee = employeeRepo.findById(id).orElse(null);
        if (employee == null) {
            throw new IllegalArgumentException("Employee with ID " + id + " does not exist");
        }
        // If you have a toDto() method, ensure it handles empty collections
        // Example: employee.toDto() should check for empty employeeTeams, skills, etc.
        return employee;
    }

    public Employee getEmployeeByName(String name) {
        return employeeRepo.findByname(name);
    }

    public Employee saveEmployee(EmployeeControllerDto employee) {
        Employee saveEmployee = new Employee();
        saveEmployee.setName(employee.getName());
        saveEmployee.setPhoneNumber(employee.getPhoneNumber());
        saveEmployee.setEmail(employee.getEmail());
        saveEmployee.setPassword(employee.getPassword());
        saveEmployee.setRole(employee.getRole());
        saveEmployee.setDepartment(employee.getDepartment());
        saveEmployee.setPosition(employee.getPosition());
        saveEmployee.setJoinDate(employee.getJoinDate());
        saveEmployee.setSkills(employee.getSkills());
        for (HashMap<String, Long> team : employee.getEmployeeTeams()) {
            if (team.get("teamId") == null) {
                throw new IllegalArgumentException("Employee team ID must be provided");
            }
            EmployeeTeam existingTeam = employeeTeamRepo.findById(team.get("teamId"))
                    .orElseThrow(() -> new IllegalArgumentException("Employee team with given ID does not exist"));
            
            saveEmployee.getEmployeeTeams().add(existingTeam);
        }
        Employee savedEmployee = employeeRepo.save(saveEmployee);
        System.out.println("Employee saved with ID: " + savedEmployee.getId());
        return savedEmployee;
    }

    public Employee updateEmployee(Employee employee) {
        if (employee.getId() == null || !employeeRepo.existsById(employee.getId())) {
            throw new IllegalArgumentException("Employee with given ID does not exist");
        }
        return employeeRepo.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepo.deleteById(id);
    }
}
