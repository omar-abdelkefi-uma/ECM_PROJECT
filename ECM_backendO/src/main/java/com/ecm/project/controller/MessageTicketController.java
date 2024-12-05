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

import com.ecm.project.entities.MessageTicket;
import com.ecm.project.services.MessageTicketService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MessageTicketController {
	// Application Api
	@Autowired
	private MessageTicketService MessageTicketservice;

	// ************************************Api
	// MessageTicket********************************************************//
	// add new MessageTicket
	@PostMapping("/messageticket/add")
	public MessageTicket createMessageTicket(@RequestBody MessageTicket MessageTicket) {
		return MessageTicketservice.save(MessageTicket);
	}

	// Get All MessageTickets
	@GetMapping("/messageticket/liste")
	public List<MessageTicket> getMessageTickets() {
		return MessageTicketservice.getMessageTickets();
	}

	// find by id
	@GetMapping("/messageticket/{id}")
	public Optional<MessageTicket> getMessageTicket(@PathVariable Long id) {
		return MessageTicketservice.find(id);

	}

	// Delete MessageTicket
	@DeleteMapping("/messageticket/delete/{id}")
	public boolean deleteMessageTicket(@PathVariable long id) {
		MessageTicketservice.delete(id);

		return true;
	}

	// update MessageTicket
	@PutMapping("/messageticket/update")
	public MessageTicket updateMessageTicket(@RequestBody MessageTicket MessageTicket) {
		return MessageTicketservice.save(MessageTicket);

	}

}
