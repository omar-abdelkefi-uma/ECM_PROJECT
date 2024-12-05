package com.ecm.message.controller;

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

import com.ecm.message.entities.Recipient;
import com.ecm.message.services.RecipientService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class RecipientController {
	// Application Api
	@Autowired
	private RecipientService Recipientservice;

	// ************************************Api
	// Recipient********************************************************//
	// add new Recipient
	@PostMapping("/recipient/add")
	public Recipient createRecipient(@RequestBody Recipient Recipient) {
		return Recipientservice.save(Recipient);
	}

	// Get All Recipients
	@GetMapping("/recipient/liste")
	public List<Recipient> getRecipients() {
		return Recipientservice.getRecipients();
	}

	// find by id
	@GetMapping("/recipient/{id}")
	public Optional<Recipient> getRecipient(@PathVariable Long id) {
		return Recipientservice.find(id);

	}

	// Delete Recipient
	@DeleteMapping("/recipient/delete/{id}")
	public boolean deleteRecipient(@PathVariable long id) {
		Recipientservice.delete(id);

		return true;
	}

	// update Recipient
	@PutMapping("/recipient/update")
	public Recipient updateRecipient(@RequestBody Recipient Recipient) {
		return Recipientservice.save(Recipient);

	}

}
