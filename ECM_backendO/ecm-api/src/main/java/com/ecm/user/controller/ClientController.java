package com.ecm.user.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecm.exception.ServiceExeption;
import com.ecm.user.entities.Client;
import com.ecm.user.entities.Document;
import com.ecm.user.entities.Notifications;
import com.ecm.user.services.ClientService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class ClientController {
	@Autowired
	private ClientService clientService;
	@Autowired
	private SimpMessagingTemplate template;
	private Notifications notifications = new Notifications(0);

	// Get All Clients
	@GetMapping("/client/liste")
	public List<Client> getClients() {
		System.out.print("id= " + notifications.getId());
		System.out.print("count= " + notifications.getCount());
		template.convertAndSend("/topic/notification", notifications);

		return clientService.getClients();
	}

	// find by id
	@GetMapping("/client/{id}")
	public Optional<Client> getClient(@PathVariable Long id) {
		return clientService.find(id);

	}

	// Delete Client
	@DeleteMapping("/client/delete/{id}")
	public boolean deleteClient(@PathVariable long id) {
		clientService.delete(id);

		return true;
	}

	// add new Client
	@PostMapping(value = "/client/create", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public void fileUpload(@RequestPart("files") List<MultipartFile> files, @RequestPart("client") String admin)
			throws ServiceExeption, JsonMappingException, JsonProcessingException {

		List<Document> documents = new ArrayList<>();
		// convert string to administrator
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(admin);
		Client client = mapper.convertValue(node, Client.class);
		if (!CollectionUtils.isEmpty(files)) {
			files.stream().forEach(file -> {
				try {
					Document filemode = new Document(file.getOriginalFilename(), file.getContentType(),
							file.getBytes());
					documents.add(filemode);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			});

		}
		if (!documents.isEmpty()) {
			System.out.print("Add documents");
			client.setDocuments(documents);
		}
		clientService.save(client);

	}

	// update Client
	@PutMapping("/client/update")
	public Client updateClient(@RequestBody Client Client) {
		System.out.print("update client controller");
		return clientService.update(Client);

	}

}
