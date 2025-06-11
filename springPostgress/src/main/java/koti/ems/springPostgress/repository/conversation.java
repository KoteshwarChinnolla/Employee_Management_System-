package koti.ems.springPostgress.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import koti.ems.springPostgress.entity.conversationTickets;

public interface conversation extends JpaRepository<conversationTickets, Long> {
}
