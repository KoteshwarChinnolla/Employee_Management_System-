package ems.service.Admin.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ems.service.Admin.dto.EmployeeControllerDto;
import ems.service.Admin.dto.EmployeeControllerIdDto;
import ems.service.Admin.entity.Employee;
import ems.service.Admin.entity.EmployeeTeam;
import ems.service.Admin.repository.EmployeeRepo;
import ems.service.Admin.repository.EmployeeTeamRepo;

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
        return employeeRepo.findById(id).orElse(null);
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

    public Employee updateEmployee(EmployeeControllerIdDto employeeDto) {
        Employee employee = employeeRepo.findByname(employeeDto.getName());
        if (employee == null) {
            throw new IllegalArgumentException("Employee with given ID does not exist");
        }
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setEmail(employeeDto.getEmail());
        employee.setPassword(employeeDto.getPassword());
        employee.setRole(employeeDto.getRole());
        employee.setDepartment(employeeDto.getDepartment());
        employee.setPosition(employeeDto.getPosition());
        employee.setJoinDate(employeeDto.getJoinDate());
        employee.setSkills(employeeDto.getSkills());
        // for (HashMap<String, Long> team : employeeDto.getEmployeeTeams()) {
        //     if (team.get("teamId") == null) {
        //         throw new IllegalArgumentException("Employee team ID must be provided");
        //     }
        //     EmployeeTeam existingTeam = employeeTeamRepo.findById(team.get("teamId"))
        //             .orElseThrow(() -> new IllegalArgumentException("Employee team with given ID does not exist"));
            
        //     employee.getEmployeeTeams().add(existingTeam);
        // }

        return employeeRepo.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepo.deleteById(id);
    }
}
