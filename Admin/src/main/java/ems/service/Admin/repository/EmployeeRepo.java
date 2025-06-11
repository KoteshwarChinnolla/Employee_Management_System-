package ems.service.Admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ems.service.Admin.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    public Employee findByname(String email);


    // @Query(nativeQuery = true, value = "UPDATE employee SET name = ?1, email = ?2, position = ?3, employee_team = ?4 WHERE id = ?5")
    // public Employee updateEmployee(Long id, String email, String name, String phone_number, String department, String join_date, String password, String position, String role, String skills, int version);

    @Query(nativeQuery = true, value = "UPDATE ems.employee SET name = ?2, phone_number = ?3, email = ?4, password = ?5, role = ?6, department = ?7, position = ?8, join_date = ?9, skills = ?10 WHERE id = ?1 RETURNING *")
    public Employee updateEmployee(Long id, String name, String phoneNumber, String email, String password, String role,String department, String position, String joinDate, List<String> skills);
}
// id|email               |name       |phone_number|department |join_date |password|position |role     |skills             |version
    //   {
    //     "version": 1,
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
    //   }