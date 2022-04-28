package com.ecm.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.project.dao.TicketDao;
import com.ecm.project.entities.Ticket;

@Service
public class TicketService {
	@Autowired
	TicketDao Ticketdao;

	public Ticket save(Ticket Ticket) {
		return Ticketdao.save(Ticket);
	}

	public Ticket update(Ticket Ticket) {
		return Ticketdao.save(Ticket);
	}

	public Optional<Ticket> find(Long id) {
		return Ticketdao.findById(id);
	}

	public List<Ticket> getTickets() {
		return Ticketdao.findAll();
	}

	public boolean delete(Long id) {
		Ticketdao.deleteById(id);
		return true;
	}
}
