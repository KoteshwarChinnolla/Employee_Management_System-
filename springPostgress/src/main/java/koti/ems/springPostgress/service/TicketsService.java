package koti.ems.springPostgress.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import koti.ems.springPostgress.repository.conversation;
import koti.ems.springPostgress.dto.AddConvDto;
import koti.ems.springPostgress.dto.AddTicketDto;
import koti.ems.springPostgress.entity.Employee;
import koti.ems.springPostgress.entity.Tickets;
import koti.ems.springPostgress.entity.conversationTickets;
import koti.ems.springPostgress.repository.TicketRepo;

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

    public Tickets saveTicket(AddTicketDto ticket,Employee employee) {
        Tickets newTicket = new Tickets();
        newTicket.setEmployee(employee);
        newTicket.setTicketName(ticket.getTicketName());
        newTicket.setTicketDescription(ticket.getTicketDescription());
        newTicket.setTicketStatus(ticket.getTicketStatus());
        newTicket.setDateCreated(ticket.getDateCreated());
        newTicket.setDataUpdated(ticket.getDataUpdated());
        newTicket.setEmpConversation(ticket.getEmpConversation());
        newTicket.setAdminConversation(ticket.getAdminConversation());

        // Set the ticket reference for each conversation before saving
        if (ticket.getEmpConversation() != null) {
            for (conversationTickets conversationTicket : ticket.getEmpConversation()) {
                conversationTicket.setTicket(newTicket);
            }
        }
        if (ticket.getAdminConversation() != null) {
            for (conversationTickets conversationTicket : ticket.getAdminConversation()) {
                conversationTicket.setTicket(newTicket);
            }
        }

        // Only save the ticket; conversations will be saved via cascade
        Tickets ticket1 = ticketRepo.save(newTicket);

        return ticket1;
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
        // conversationTickets savedTicket = conversationRepo.save(convTicket);
        // System.out.println("Saved conversation ticket: " + savedTicket.getId());
        if(ticket.getSender().toLowerCase() == "employee") {
            tickets.getEmpConversation().add(convTicket);
        } else {
            tickets.getAdminConversation().add(convTicket);
        }
        return ticketRepo.save(tickets);
    }
}