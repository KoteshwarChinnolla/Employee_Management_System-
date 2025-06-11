package ems.service.Admin.dto;
import java.util.HashMap;
import java.util.List;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeControllerDto {
    private Integer version;
    private String name;
    private String phoneNumber;
    private String email;
    private String password;
    private String role;
    private String department;
    private String position;
    private String joinDate;
    private List<String> skills;
    private List<HashMap<String, Long>> employeeTeams;
}
//   {
//     "version": 0,
//     "name": "Kara Stone",
//     "phoneNumber": "9876543220",
//     "email": "kara11@example.com",
//     "password": "pass123",
//     "role": "Developer",
//     "department": "Engineering",
//     "position": "Team Lead",
//     "joinDate": "2023-08-15",
//     "skills": ["Java", "Spring"],
//     "employeeTeams": [{ "teamId": 1 }, { "teamId": 4 }, { "teamId": 5 }]
//   },