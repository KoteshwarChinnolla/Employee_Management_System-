package ems.service.Admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ems.service.Admin.entity.conversationTickets;

public interface conversation extends JpaRepository<conversationTickets, Long> {
}
