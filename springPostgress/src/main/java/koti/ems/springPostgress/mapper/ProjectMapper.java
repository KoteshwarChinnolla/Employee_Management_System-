package koti.ems.springPostgress.mapper;

import koti.ems.springPostgress.dto.ProjectDto;
import koti.ems.springPostgress.entity.Projects;

public class ProjectMapper {
    public static ProjectDto toProjectDto(Projects project) {
        return new ProjectDto(
            project.getId(),
            project.getName(),
            project.getDescription(),
            project.getStartDate(),
            project.getEndDate()
        );
    }
}