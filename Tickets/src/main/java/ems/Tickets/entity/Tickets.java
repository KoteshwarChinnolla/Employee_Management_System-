package ems.Tickets.entity;
import lombok.*;
import jakarta.persistence.*;
import ems.Tickets.dto.TicketsDto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.springframework.cglib.core.Local;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tickets", schema = "ems")
public class Tickets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // @ManyToOne
    // @JoinColumn(name = "employee_id", referencedColumnName = "id")
    // @JsonBackReference
    @Column(name = "employee_id")
    private Long employee;
    @Column(name = "ticket_name")
    private String ticketName;
    @Column(name = "ticket_description")
    private String ticketDescription;
    @Column(name = "ticket_status")
    private String ticketStatus;
    @Column(name = "date_created")
    private String dateCreated;
    @Column(name = "date_updated")
    private String dataUpdated;
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<conversationTickets> empConversation = new ArrayList<>();

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<conversationTickets> adminConversation = new ArrayList<>();
    @Transient
    public List<conversationTickets> sortConversationByData() {
        List<conversationTickets> conversionAll = new ArrayList<>();
        conversionAll.addAll(this.getEmpConversation());
        conversionAll.addAll(this.getAdminConversation());
        // Deduplicate by conversation ID
        Map<Long, conversationTickets> unique = new LinkedHashMap<>();
        for (conversationTickets conv : conversionAll) {
            if (conv.getId() != null) {
                unique.put(conv.getId(), conv);
            }
        }
        List<conversationTickets> deduped = new ArrayList<>(unique.values());
        Collections.sort(deduped, new Comparator<conversationTickets>() {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            @Override
            public int compare(conversationTickets o1, conversationTickets o2) {
                LocalDate date1 = LocalDate.parse(o1.getDate(), formatter);
                LocalDate date2 = LocalDate.parse(o2.getDate(), formatter);
                return date2.compareTo(date1);
            }
        });
        return deduped;
    }

    public TicketsDto toDto() {
        TicketsDto dto = new TicketsDto();
        dto.setTicketId(this.id);
        dto.setTicketName(this.ticketName);
        dto.setTicketDescription(this.ticketDescription);
        dto.setTicketStatus(this.ticketStatus);
        dto.setDateCreated(this.dateCreated);
        List<conversationTickets> sortedConversations = this.sortConversationByData();
        dto.setAllConversations(sortedConversations);
        return dto;
    }    
}
