package com.ecm.message.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.message.dao.RecipientDao;
import com.ecm.message.entities.Recipient;

@Service
public class RecipientService {
	@Autowired
	RecipientDao Recipientdao;

	public Recipient save(Recipient Recipient) {

		return Recipientdao.save(Recipient);

	}

	public Recipient update(Recipient Recipient) {
		return Recipientdao.save(Recipient);
	}

	public Optional<Recipient> find(Long id) {
		return Recipientdao.findById(id);
	}

	public List<Recipient> getRecipients() {
		return Recipientdao.findAll();
	}

	public boolean delete(Long id) {
		Recipientdao.deleteById(id);
		return true;
	}
}
