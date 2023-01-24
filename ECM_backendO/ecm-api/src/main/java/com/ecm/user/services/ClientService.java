package com.ecm.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecm.user.dao.ClientDao;
import com.ecm.user.entities.Client;

@Service
public class ClientService {
	@Autowired
	ClientDao clientDao;
	@Autowired
	private PasswordEncoder bcryptEncoder;

	public Client save(Client Client) {
		Client.setPassword(bcryptEncoder.encode(Client.getPassword()));
		Client.setType("client");
		return clientDao.save(Client);
	}

	public Client update(Client client) {
		System.out.print("update client service");
		Optional<Client> cl = clientDao.findById(client.getId());
		client.setPassword(cl.get().getPassword());
		return clientDao.save(client);

	}

	public Optional<Client> find(Long id) {
		return clientDao.findById(id);
	}

	public List<Client> getClients() {
		return clientDao.findAll();
	}

	public boolean delete(Long id) {
		clientDao.deleteById(id);
		return true;
	}
}
