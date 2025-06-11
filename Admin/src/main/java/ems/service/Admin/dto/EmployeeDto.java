package ems.service.Admin.dto;

import java.util.List;

import ems.service.Admin.entity.Achivements;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private Long id;
    private String name;
    private String password;
    private String role;
    private String email;
    private String department;
    private String position;
    private EmployeeTeamDto team;
    private String joinDate;
    private ContactDto contact;
    private List<String> skills;
    private List<ProjectDto> projects;
    private List<EmployeeDtoGen> employeeTeam;
    private List<Achivements> achivements;
}

//         {
//             "id": "EMP001",
//             "name": "John Doe",
//             "password": "123456",
//             "role": "admin",
//             "email": "john.doe@company.com",
//             "department": "Management",
//             "position": "Senior Manager",
//             "team": "Leadership",
//             "joinDate": "2022-01-01",
//             "contact": {
//                 "phone": "+1-555-0123",
//                 "address": "123 Business Ave, Suite 100"
//             },
//             "skills": ["Leadership", "Strategy", "Team Management", "Business Development"],
//             "projects": ["Team Platform", "Digital Transformation"],
//             "achievements": [
//                 {
//                     "id": 1,
//                     "title": "Best Manager 2023",
//                     "date": "2023-12-01",
//                     "description": "Awarded for exceptional team leadership"
//                 }
//             ]
//         },