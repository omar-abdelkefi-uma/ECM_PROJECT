package com.ecm.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecm.project.entities.Ticket;

public interface TicketDao extends JpaRepository<Ticket, Long> {

}
