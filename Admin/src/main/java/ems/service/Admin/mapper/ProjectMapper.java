package ems.service.Admin.mapper;

import ems.service.Admin.dto.ProjectDto;
import ems.service.Admin.entity.Projects;

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