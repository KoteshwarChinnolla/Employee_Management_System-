package ems.Tickets.entity;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "conversation_tickets", schema = "ems")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE, region = "defaultCache")
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