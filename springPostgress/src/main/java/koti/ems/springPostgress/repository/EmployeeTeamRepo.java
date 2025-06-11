package koti.ems.springPostgress.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import koti.ems.springPostgress.entity.EmployeeTeam;

public interface EmployeeTeamRepo extends JpaRepository<EmployeeTeam, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM employee_team WHERE team_name = :name")
    EmployeeTeam findByName(String name);
}
