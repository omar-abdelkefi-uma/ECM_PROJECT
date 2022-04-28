package com.ecm.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecm.user.dao.Repopermission;
import com.ecm.user.entities.Permission;

@Service
public class PermissionService {
	@Autowired
	Repopermission permissionRepository;

	public Permission save(Permission permission) {
		return permissionRepository.save(permission);
	}

	public Permission update(Permission permission) {
		return permissionRepository.save(permission);
	}

	public Optional<Permission> find(Long id) {
		return permissionRepository.findById(id);
	}

	public List<Permission> getPermissions() {
		return permissionRepository.findAll();
	}

	public boolean delete(Long id) {
		permissionRepository.deleteById(id);
		return true;
	}

}
