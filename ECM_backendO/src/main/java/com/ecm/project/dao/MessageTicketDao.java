package com.ecm.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecm.project.entities.MessageTicket;

public interface MessageTicketDao extends JpaRepository<MessageTicket, Long> {

}
