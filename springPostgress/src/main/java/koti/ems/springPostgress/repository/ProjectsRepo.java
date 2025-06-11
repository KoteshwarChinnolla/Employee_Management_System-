package koti.ems.springPostgress.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import koti.ems.springPostgress.entity.Projects;

public interface ProjectsRepo extends JpaRepository<Projects, Long> {
}
