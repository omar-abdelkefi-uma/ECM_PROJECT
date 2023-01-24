package com.ecm.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.project.dao.TypeTaskDao;
import com.ecm.project.entities.TypeTask;

@Service
public class TypeTaskService {
	@Autowired
	TypeTaskDao TypeTaskdao;

	public TypeTask save(TypeTask TypeTask) {
		return TypeTaskdao.save(TypeTask);
	}

	public TypeTask update(TypeTask TypeTask) {
		return TypeTaskdao.save(TypeTask);
	}

	public Optional<TypeTask> find(Long id) {
		return TypeTaskdao.findById(id);
	}

	public List<TypeTask> getTypeTasks() {
		return TypeTaskdao.findAll();
	}

	public boolean delete(Long id) {
		TypeTaskdao.deleteById(id);
		return true;
	}
}
