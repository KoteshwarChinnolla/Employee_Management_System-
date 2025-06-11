package koti.ems.springPostgress.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import koti.ems.springPostgress.entity.Projects;
import koti.ems.springPostgress.repository.ProjectsRepo;

@Service
public class ProjectsService {
    
    @Autowired
    ProjectsRepo projectsRepo;

    public List<Projects> getAll(){
        return projectsRepo.findAll();
    }

    public Projects saveProject(Projects project) {
        return projectsRepo.save(project);
    }

    public Projects getProject(Long id) {
        return projectsRepo.findById(id).orElse(null);
    }

    public Projects updateProject(Projects project) {
        if (project.getId() == null || !projectsRepo.existsById(project.getId())) {
            throw new IllegalArgumentException("Project with given ID does not exist");
        }
        return projectsRepo.save(project);
    }

    public void deleteProject(Long id) {
        projectsRepo.deleteById(id);
    }
}
