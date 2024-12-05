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


	public List<Module> getModules() {
		return moduleRepository.findAll();
	}

}
