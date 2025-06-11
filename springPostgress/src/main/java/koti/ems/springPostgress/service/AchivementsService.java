package koti.ems.springPostgress.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import koti.ems.springPostgress.entity.Achivements;
import koti.ems.springPostgress.repository.AchivementsRepo;
import koti.ems.springPostgress.repository.EmployeeRepo;

@Service
public class AchivementsService {
    
    @Autowired
    AchivementsRepo achivementsRepo;

    @Autowired
    EmployeeRepo employeeRepo;

    public List<Achivements> getAll(){
        return achivementsRepo.findAll();
    }

    public List<Achivements> getAchivementByEmpId(Long empId) {
        return achivementsRepo.findByEmpId(empId);
    }

    public Achivements saveAchivement(Achivements achivement) {
        achivement.setEmployee(
            employeeRepo.findById(achivement.getEmployee().getId()).orElseThrow(() -> new IllegalArgumentException("Employee with given ID does not exist"))
        );
        return achivementsRepo.save(achivement);
    }
    public Achivements getAchivement(Long id) {
        return achivementsRepo.findById(id).orElse(null);
    }
    public Achivements updateAchivement(Achivements achivement) {
        if (achivement.getId() == null || !achivementsRepo.existsById(achivement.getId())) {
            throw new IllegalArgumentException("Achivement with given ID does not exist");
        }
        return achivementsRepo.save(achivement);
    }
    public void deleteAchivement(Long id) {
        achivementsRepo.deleteById(id);
    }
    
}
