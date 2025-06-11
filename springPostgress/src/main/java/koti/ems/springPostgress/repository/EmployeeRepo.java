package koti.ems.springPostgress.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import koti.ems.springPostgress.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    public Employee findByname(String name);
}
