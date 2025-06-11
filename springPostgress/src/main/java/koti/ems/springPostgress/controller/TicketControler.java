package koti.ems.springPostgress.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import koti.ems.springPostgress.dto.AddConvDto;
import koti.ems.springPostgress.dto.TicketsDto;
import koti.ems.springPostgress.entity.Tickets;
import koti.ems.springPostgress.service.EmployeeTeamService;
import koti.ems.springPostgress.service.TicketsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/employee/ticket")
public class TicketControler {
    
    @Autowired
    TicketsService ticketService;

    @Autowired
    EmployeeTeamService EmployeeTeamService;

    // @PostMapping("/addTicket")
    // public String addTicket(@RequestBody Tickets entity) {
        
    //     Tickets savedTicket = ticketService.saveTicket(entity);
        
    //     return "Ticket saved with ID: " + savedTicket.getId();
    // }

    @GetMapping("/getTicketByEnpId")
    public List<Tickets> getTicketByEnpId(@RequestParam Long id) {
        
        return ticketService.getTicketsByEmployee(id);
    }

    @GetMapping("/getTicketByEnpIdAll")
    public List<TicketsDto> getTicketByEnpIdAll(@RequestParam Long id) {
        return ticketService.getTicketsByEmployee(id)
                .stream()
                .map(ticket -> ticket.toDto())
                .toList();
    }
    
    @PostMapping("/addConversation")
    public Tickets addConversation(@RequestBody AddConvDto convTickets) {
    // {
    //     "date": "2025-06-01",
    //     "message": "WiFi disconnects often.",
    //     "sender": "EMPLOYEE",
    //     "ticket": 1
    // }
        System.out.println("Adding conversation to ticket with ID: " + convTickets.getTicket());
        return ticketService.addConversation(convTickets);
    }
}
