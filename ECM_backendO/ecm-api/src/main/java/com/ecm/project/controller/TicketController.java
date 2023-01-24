package com.ecm.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecm.project.entities.Ticket;
import com.ecm.project.services.TicketService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TicketController {
	// Application Api
	@Autowired
	private TicketService Ticketservice;

	// ************************************Api
	// Ticket********************************************************//
	// add new Ticket
	@PostMapping("/ticket/add")
	public Ticket createTicket(@RequestBody Ticket ticket) {
		ticket.setStatus("new");
		return Ticketservice.save(ticket);
	}

	// Get All Tickets
	@GetMapping("/ticket/liste")
	public List<Ticket> getTickets() {
		return Ticketservice.getTickets();
	}

	// find by id
	@GetMapping("/ticket/{id}")
	public Optional<Ticket> getTicket(@PathVariable Long id) {
		return Ticketservice.find(id);

	}

	// Delete Ticket
	@DeleteMapping("/ticket/delete/{id}")
	public boolean deleteTicket(@PathVariable long id) {
		Ticketservice.delete(id);

		return true;
	}

	// update Ticket
	@PutMapping("/ticket/update")
	public Ticket updateTicket(@RequestBody Ticket Ticket) {
		return Ticketservice.save(Ticket);

	}

}
