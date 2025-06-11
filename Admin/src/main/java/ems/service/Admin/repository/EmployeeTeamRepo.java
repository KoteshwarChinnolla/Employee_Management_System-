package ems.service.Admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ems.service.Admin.entity.EmployeeTeam;

public interface EmployeeTeamRepo extends JpaRepository<EmployeeTeam, Long> {
}
