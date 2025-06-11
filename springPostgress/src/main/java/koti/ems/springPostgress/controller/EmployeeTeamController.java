package koti.ems.springPostgress.controller;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import koti.ems.springPostgress.dto.EmployeeTeamDto;
import koti.ems.springPostgress.entity.EmployeeTeam;
import koti.ems.springPostgress.service.EmployeeService;
import koti.ems.springPostgress.service.EmployeeTeamService;

@RestController
@RequestMapping("/employee/employeeTeam")
public class EmployeeTeamController {

    @Autowired
    EmployeeTeamService EmployeeTeamService;

    @Autowired
    EmployeeService employeeService;
    @GetMapping("/getAll")
    public List<EmployeeTeamDto> getAll(){
        return EmployeeTeamService.getAll()
        .stream()
        .map(EmployeeTeam::toDto)
        .toList();
    }

    @GetMapping("/getEmployeeTeam/{name}")
    public EmployeeTeamDto getEmployeeTeam(@PathVariable String name) {
        name = name.replace("-", " ");
        EmployeeTeam team = EmployeeTeamService.getTeamByName(name);
        return team != null ? team.toDto() : null;
    }

}
