package com.ecm.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.project.dao.MessageTicketDao;
import com.ecm.project.entities.MessageTicket;

@Service
public class MessageTicketService {
	@Autowired
	MessageTicketDao MessageTicketdao;

	public MessageTicket save(MessageTicket MessageTicket) {
		return MessageTicketdao.save(MessageTicket);
	}

	public MessageTicket update(MessageTicket MessageTicket) {
		return MessageTicketdao.save(MessageTicket);
	}

	public Optional<MessageTicket> find(Long id) {
		return MessageTicketdao.findById(id);
	}

	public List<MessageTicket> getMessageTickets() {
		return MessageTicketdao.findAll();
	}

	public boolean delete(Long id) {
		MessageTicketdao.deleteById(id);
		return true;
	}
}
