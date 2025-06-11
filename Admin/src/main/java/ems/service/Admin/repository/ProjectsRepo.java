package ems.service.Admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ems.service.Admin.entity.Projects;

public interface ProjectsRepo extends JpaRepository<Projects, Long> {
}
