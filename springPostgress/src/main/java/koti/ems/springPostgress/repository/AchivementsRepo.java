package koti.ems.springPostgress.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import koti.ems.springPostgress.entity.Achivements;
import java.util.*;

public interface AchivementsRepo extends JpaRepository<Achivements, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM Achivements WHERE employee_id = :empId")
    List<Achivements> findByEmpId(Long empId);
}
