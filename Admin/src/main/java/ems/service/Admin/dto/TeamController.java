package ems.service.Admin.dto;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeamController {
    private Long id = null;
    private String name = null;
    private String description = null;
    private List<Long> allProjects;
    private List<Long> allEmployees;
}

// {
//      "id": Long(),
//     "name": String(),
//     "description": String(),
//     "allProjects": List(project ids),
//     "allEmployees": List(employee ids)
// }
