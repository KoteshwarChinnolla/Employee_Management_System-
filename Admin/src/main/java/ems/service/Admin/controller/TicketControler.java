package ems.service.Admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ems.service.Admin.dto.AddConvDto;
import ems.service.Admin.dto.TicketsDto;
import ems.service.Admin.entity.Tickets;
import ems.service.Admin.service.TicketsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/admin/ticket")
public class TicketControler {
    
    @Autowired
    TicketsService ticketService;

    @PostMapping("/addTicket")
    public String addTicket(@RequestBody Tickets entity) {
    // {
    //   "employee": { "id": 1 },
    //   "ticketName": "VPN Problem",
    //   "ticketDescription": "VPN disconnects frequently.",
    //   "ticketStatus": "In Progress",
    //   "dateCreated": "2025-05-30",
    //   "dataUpdated": "2025-06-01",
    //   "empConversation": [
    //     { "date": "2025-05-30", "message": "VPN is unstable.", "sender": "EMPLOYEE" }
    //   ],
    //   "adminConversation": [
    //     { "date": "2025-06-01", "message": "Checking server logs.", "sender": "ADMIN" }
    //   ]
    // }

        Tickets savedTicket = ticketService.saveTicket(entity);
        
        return "Ticket saved with ID: " + savedTicket.getId();
    }

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
    @GetMapping("/getTicketById")
    public Tickets getTicketById(@RequestParam Long id) {
        return ticketService.getTicket(id);
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

    @GetMapping("/getAllTickets")
    public List<TicketsDto> getAllTickets() {
        return ticketService.getAllTickets().stream()
                .map(ticket -> ticket.toDto())
                .toList();
    }
}
