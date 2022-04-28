package com.ecm.message.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecm.message.entities.Message;
import com.ecm.message.services.MessageService;
import com.ecm.user.entities.User;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MessageController {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	/*
	 * @MessageMapping("/hello") public void greeting(Principal principal,
	 * HelloMessage message) throws Exception { Greeting greeting = new Greeting();
	 * greeting.setContent("Hello !"); System.out.print("dddddddddddddddddd");
	 * messagingTemplate.convertAndSendToUser(message.getToUser(), "/queue/reply",
	 * greeting); }
	 */

	// Application Api
	@Autowired
	private MessageService Messageservice;
	@Autowired
	private SimpUserRegistry simpUserRegistry;

	// ************************************Api
	// Message********************************************************//
	// add new Message
	@PostMapping("/message/add")
	public Message createMessage(@RequestBody Message message) {
		Message mssg = Messageservice.save(message);
		Set<SimpUser> subscribers = simpUserRegistry.getUsers();
		Optional<SimpUser> su = subscribers.stream()
				.filter(sub -> sub.getName().equals((message.getRecipient().getUser().getFullname()))).findFirst();
		;
		if (!su.isEmpty()) {
			// Recipient is subscribed
			messagingTemplate.convertAndSendToUser(message.getRecipient().getUser().getFullname(), "/queue/reply",
					message);
		}

		return mssg;
	}

	// Get All Messages Of Connected User
	@GetMapping("/message/liste")
	public List<Message> getMessages(Authentication auth) {

		return Messageservice.getMessages(auth);
	}

	// find by id
	@GetMapping("/message/{id}")
	public Optional<Message> getMessage(@PathVariable Long id) {
		return Messageservice.find(id);

	}

	// Delete Message
	@DeleteMapping("/message/delete/{id}")
	public boolean deleteMessage(@PathVariable long id) {
		Messageservice.delete(id);

		return true;
	}

	// update Message
	@PutMapping("/message/update")
	public Message updateMessage(@RequestBody Message Message) {
		return Messageservice.save(Message);

	}

}