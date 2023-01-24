package com.ecm.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.user.dao.DocumentDao;
import com.ecm.user.entities.Document;

@Service
public class DocumentService {
	@Autowired
	DocumentDao document;

	@Transactional
	public Document save(Document doc) {
		return document.save(doc);
	}

	public Optional<Document> findById(Long id) {
		// TODO Auto-generated method stub
		return document.findById(id);
	}

	public List<Document> findAll() {
		// TODO Auto-generated method stub
		return document.findAll();
	}

	public List<Document> findByPersonId(Long id) {
		// TODO Auto-generated method stub
		return document.findByUserId(id);
	}
	// public void delete(long id) {
	// document.deleteById(id);

	// }
	public void deleteById(Long id) {
		document.deleteById(id);
	}
}
