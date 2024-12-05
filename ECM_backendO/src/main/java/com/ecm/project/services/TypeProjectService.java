package com.ecm.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.project.dao.TypeProjectDao;
import com.ecm.project.entities.TypeProject;

@Service
public class TypeProjectService {
	@Autowired
	TypeProjectDao TypeProjectdao;

	public TypeProject save(TypeProject TypeProject) {
		return TypeProjectdao.save(TypeProject);
	}

	public TypeProject update(TypeProject TypeProject) {
		return TypeProjectdao.save(TypeProject);
	}

	public Optional<TypeProject> find(Long id) {
		return TypeProjectdao.findById(id);
	}

	public List<TypeProject> getTypeProjects() {
		return TypeProjectdao.findAll();
	}

	public boolean delete(Long id) {
		TypeProjectdao.deleteById(id);
		return true;
	}
}
