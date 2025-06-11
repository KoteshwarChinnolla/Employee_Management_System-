package koti.ems.springPostgress.dto;
import java.util.List;

import koti.ems.springPostgress.entity.Projects;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeamDto {
    private Long teamId;
    private String teamName;
    private String teamDescription;
    private ProjectDto currentProject;
    private List<EmployeeDtoGen> teamMembers;
    private List<ProjectDto> pastProjects;
}