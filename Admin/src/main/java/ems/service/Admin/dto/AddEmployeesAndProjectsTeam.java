package ems.service.Admin.dto;
import java.util.*;

import ems.service.Admin.entity.Projects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddEmployeesAndProjectsTeam {
    private List<Long> employees = new ArrayList<>();
    private EmployeeTeamDto team;
    List<Long> projectIds = new ArrayList<>();
}
