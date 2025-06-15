package ems.Tickets.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ems.Tickets.entity.conversationTickets;

public interface conversation extends JpaRepository<conversationTickets, Long> {
}
