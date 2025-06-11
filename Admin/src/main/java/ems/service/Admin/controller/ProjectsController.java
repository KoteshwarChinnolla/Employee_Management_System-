package ems.service.Admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ems.service.Admin.service.ProjectsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import ems.service.Admin.dto.AddProjectDto;
import ems.service.Admin.entity.Projects;



@RestController
@RequestMapping("/admin/projects")
public class ProjectsController {
    
    @Autowired
    ProjectsService projectsService;

    @GetMapping("/getAll")
    public Iterable<Projects> getAllProjects() {
        System.out.println("Fetching all Projects");
        return projectsService.getAll();
    }

    @GetMapping("/getProject/{id}")
    public Projects getProject(@PathVariable Long id) {
        System.out.println("Fetching Project with ID: " + id);
        return projectsService.getProject(id);
    }

    @PostMapping("/postProject")
    public Projects postProject(@RequestBody AddProjectDto project) {
        System.out.println("Received Project: " + project);
        // {
        //     "name": "Project Alpha",
        //     "description": "A new project to develop a web application",
        //     "startDate": "2023-01-01",
        //     "endDate": "2023-12-31",
        //     "status": "In Progress",
        //     "budget": "100000",
        //     "clientName": "Tech Solutions Inc.",
        //     "clientContact": "+1-555-1234",
        //     "clientEmail": "example@gmail.com",
        //     "clientAddress": "123 Tech Street, Silicon Valley",
        //     "clientWebsite": "www.techsolutions.com",
        //     "employeeTeam": {
        //         "id": 6
        //     }
        // }
        Projects savedProject = projectsService.saveProject(project);
        return savedProject;
    }

    @PostMapping("/updateProject")
    public String updateProject(@RequestBody Projects project) {
        System.out.println("Updating Project with ID: " + project.getId());
        Projects updatedProject = projectsService.updateProject(project);
        return "Project updated with ID: " + updatedProject;
    }

    @GetMapping("/deleteProject/{id}")
    public String deleteProject(@PathVariable Long id) {
        projectsService.deleteProject(id);
        return "Project with ID: " + id + " deleted successfully";
    }    
}
