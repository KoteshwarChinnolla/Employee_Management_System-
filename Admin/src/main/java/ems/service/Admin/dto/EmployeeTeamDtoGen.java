package ems.service.Admin.dto;
import java.util.List;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeTeamDtoGen {
    private Long teamId;
    private String teamName;
    private String teamDescription;
    private ProjectDto currentProject;
    private List<EmployeeDtoGen> employee;
}
