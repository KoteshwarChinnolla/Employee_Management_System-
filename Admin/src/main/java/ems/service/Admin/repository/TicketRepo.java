package ems.service.Admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ems.service.Admin.entity.Tickets;

public interface TicketRepo extends JpaRepository<Tickets, Long> {
    List<Tickets> findByEmployeeId(Long employeeId);
    @Query(nativeQuery = true, value = "SELECT * FROM Student WHERE employee_id = :empId")
    List<Tickets> findByEmpId(Long empId);
}