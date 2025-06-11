package koti.ems.springPostgress.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import koti.ems.springPostgress.dto.AchivementsDto;
import koti.ems.springPostgress.entity.Achivements;
import koti.ems.springPostgress.entity.Employee;
import koti.ems.springPostgress.service.AchivementsService;
import koti.ems.springPostgress.service.EmployeeService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/employee/achivement")
public class AchiveteamController {
    
    @Autowired
    AchivementsService achivementsService;

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/getAchivement/{name}")
    public List<AchivementsDto> getAchivement(String name) {
        Employee employee = employeeService.getEmployeeByName(name);
        return achivementsService.getAchivementByEmpId(employee.getId()).stream()
        .map(Achivements::toDto)
        .toList();
    }
}