package ems.service.Admin.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "conversation_tickets", schema = "ems")
public class conversationTickets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String date;
    private String message;
    private String sender;
    @ManyToOne
    @JoinColumn(name = "ticket_id")
    @JsonIgnore
    private Tickets ticket;
}