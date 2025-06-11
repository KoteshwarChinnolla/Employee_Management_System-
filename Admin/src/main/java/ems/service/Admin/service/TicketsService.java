package ems.service.Admin.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ems.service.Admin.repository.conversation;
import ems.service.Admin.dto.AddConvDto;
import ems.service.Admin.entity.Employee;
import ems.service.Admin.entity.Tickets;
import ems.service.Admin.entity.conversationTickets;
import ems.service.Admin.repository.TicketRepo;

@Service
public class TicketsService {
    
    @Autowired
    private TicketRepo ticketRepo;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private conversation conversationRepo;

    public List<Tickets> getTicketsByEmployee(Long employeeId) {
        return ticketRepo.findByEmployeeId(employeeId);
    }

    public List<Tickets> getAllTickets() {
        return ticketRepo.findAll();
    }

    public Tickets saveTicket(Tickets ticket) {
        System.out.println("Saving ticket: " + ticket.getEmpConversation().size());
        Employee employee = employeeService.getEmployeeDetails(ticket.getEmployee().getId());
        if (employee == null) {
            throw new IllegalArgumentException("Employee with given ID does not exist");
        }
        
        ticket.setEmployee(employee);
        System.out.println("Employee found: " + employee.getName());
        System.out.println("saving");
        Tickets savedTicket = ticketRepo.save(ticket);
        for (conversationTickets conversationTicket : ticket.getEmpConversation()) {
            conversationTicket.setTicket(savedTicket);
            conversationRepo.save(conversationTicket);
        }
        for (conversationTickets conversationTicket : ticket.getAdminConversation()) {
            conversationTicket.setTicket(savedTicket);
            conversationRepo.save(conversationTicket);
        }
        return savedTicket;
    }

    public Tickets getTicket(Long id) {
        return ticketRepo.findById(id).orElse(null);
    }
    public Tickets addConversation(AddConvDto ticket) {
        Tickets tickets = ticketRepo.findById(ticket.getTicket()).orElse(null);
        if (tickets == null) {
            throw new IllegalArgumentException("Ticket with given ID does not exist");
        }
        System.out.println("found ticket: " + tickets.getId());
        conversationTickets convTicket = new conversationTickets();
        convTicket.setMessage(ticket.getMessage());
        convTicket.setSender(ticket.getSender());
        convTicket.setTicket(tickets);
        convTicket.setDate(ticket.getDate());
        conversationTickets savedTicket = conversationRepo.save(convTicket);
        System.out.println("Saved conversation ticket: " + savedTicket.getId());
        if(ticket.getSender() == "Employee") {
            tickets.getEmpConversation().add(savedTicket);
        } else {
            tickets.getAdminConversation().add(savedTicket);
        }
        return ticketRepo.save(tickets);
    }
}
