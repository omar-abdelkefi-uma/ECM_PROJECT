package com.ecm.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.user.dao.Repomodule;
import com.ecm.user.entities.Module;
import com.ecm.user.entities.Permission;

@Service
public class ModuleService {
	@Autowired
	Repomodule moduleRepository;

	public Module save(Module module) {
		return moduleRepository.save(module);
	}

	public Module update(Module module) {
		return moduleRepository.save(module);
	}

	public Optional<Module> find(Long id) {
		return moduleRepository.findById(id);
	}

	public List<Module> getModules() {
		return moduleRepository.findAll();
	}

	public List<Permission> getModulePermission(Long id) {
		Optional<Module> module = moduleRepository.findById(id);
		return module.get().getPermissions();
	}

	public boolean delete(Long id) {
		moduleRepository.deleteById(id);
		return true;
	}
}
