package com.ecm.message.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ecm.message.dao.MessageDao;
import com.ecm.message.entities.Message;
import com.ecm.user.dao.UserDao;
import com.ecm.user.entities.User;

@Service
public class MessageService {
	@Autowired
	MessageDao Messagedao;
	@Autowired
	UserDao userdao;

	public Message save(Message Message) {

		return Messagedao.save(Message);

	}

	public Message update(Message Message) {
		return Messagedao.save(Message);
	}

	public Optional<Message> find(Long id) {
		return Messagedao.findById(id);
	}

	public List<Message> getMessages(Authentication auth) {
		auth = SecurityContextHolder.getContext().getAuthentication();
		String useremail = auth.getName();
		User user = userdao.findByUsername(useremail);

		return Messagedao.findMessageofConnectedUser(user.getId());
	}

	public boolean delete(Long id) {
		Messagedao.deleteById(id);
		return true;
	}
}
