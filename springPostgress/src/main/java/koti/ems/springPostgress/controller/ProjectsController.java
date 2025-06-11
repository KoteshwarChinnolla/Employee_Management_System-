package koti.ems.springPostgress.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import koti.ems.springPostgress.service.ProjectsService;
import org.springframework.web.bind.annotation.GetMapping;

import koti.ems.springPostgress.dto.ProjectDto;
import koti.ems.springPostgress.entity.Projects;



@RestController
@RequestMapping("/employee/projects")
public class ProjectsController {
    
    @Autowired
    ProjectsService projectsService;

    @GetMapping("/getAll")
    public List<ProjectDto> getAllProjects() {
        System.out.println("Fetching all Projects");
        return projectsService.getAll()
        .stream()
        .map(Projects::toDto)
        .toList();
    }
}
