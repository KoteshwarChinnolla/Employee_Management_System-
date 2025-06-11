package ems.service.Admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ems.service.Admin.entity.Achivements;
import ems.service.Admin.service.AchivementsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/admin/achivement")
public class AchiveteamController {
    
    @Autowired
    AchivementsService achivementsService;

    @GetMapping("/getAll")
    public List<Achivements> get() {
        return achivementsService.getAll();
    }

    @GetMapping("/getAchivement/{id}")
    public Achivements getAchivement(Long id) {
        return achivementsService.getAchivement(id);
    }

    @PostMapping("/postAchivement")
    public String postAchivement(@RequestBody Achivements achivement) {
        System.out.println("Received Achivement: ");
    // {
    //     "title": "Employee of the Month",
    //     "description": "Awarded for outstanding performance in June 2025.",
    //     "date": "2025-06-30",
    //     "employee": {
    //         "id": 1
    //     }
    // }
        Achivements savedAchivement = achivementsService.saveAchivement(achivement);
        return "Achivement saved with ID: " + savedAchivement.getId();
    }

    @PostMapping("/postAchivementList")
    public String postMethodName(@RequestBody List<Achivements> achivementsList) {
        for(Achivements achivement : achivementsList) {
            Achivements savedAchivement = achivementsService.saveAchivement(achivement);
            System.out.println("Achivement saved with ID: " + savedAchivement.getId());
        }
        
        return "Achievements saved successfully";
    }
    
    
    @PostMapping("/updateAchivement")
    public String updateAchivement(@RequestBody Achivements achivement) {
        System.out.println("Updating Achivement with ID: " + achivement.getId());
        Achivements updatedAchivement = achivementsService.updateAchivement(achivement);
        return "Achivement updated with ID: " + updatedAchivement.getId();
    }

    @GetMapping("/deleteAchivement/{id}")
    public String deleteAchivement(Long id) {
        achivementsService.deleteAchivement(id);
        return "Achivement with ID: " + id + " deleted successfully";
    }
    
    
    
}
