package com.ecm.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.user.dao.Reporole;
import com.ecm.user.entities.Role;

@Service
public class RoleService {
	@Autowired
	Reporole roleRepository;

	public Role save(Role role) {
		return roleRepository.save(role);
	}

	public Role update(Role role) {
		return roleRepository.save(role);
	}

	public Optional<Role> find(Long id) {
		return roleRepository.findById(id);
	}

	public List<Role> getRoles() {
		return roleRepository.findAll();
	}

	public boolean delete(Long id) {
		roleRepository.deleteById(id);
		return true;
	}

}
