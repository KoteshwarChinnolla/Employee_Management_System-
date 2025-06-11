package ems.service.Admin.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddProjectDto {
    private Long id = null;
    private String name = null;
    private String description = null;
    private String startDate = null;
    private String endDate = null;
    private String status = null;
    private String budget = null;
    private String clientName = null;
    private String clientContact = null;
    private String clientEmail = null;
    private String clientAddress = null;
    private String clientWebsite = null;
    private TeamController employeeTeam = null;

}
// {
//     "Id": 1,
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
//     "clientWebsite": "www.techsolutions.com"
//     "employeeTeam": {
//         "teamId": 1,
//         "teamName": "Development Team"
//     }
// }