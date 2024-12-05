package com.ecm.user.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecm.user.services.ModuleService;

import com.ecm.user.entities.Module;
import com.ecm.user.entities.Permission;

@RestController
@RequestMapping("/api")
public class ModuleController {

	@Autowired
	private ModuleService moduleservice;

	// ***********************************Api
	// module******************************************************//
	// Get All module
	@GetMapping("/module/liste")
	public List<Module> getModules() {
		return moduleservice.getModules();
	}

	// add new Module
	@PostMapping("/module/create")
	public Module createModule(@RequestBody Module module) {
		return moduleservice.save(module);

	}

	// update module
	@PutMapping("/module/update")
	public Module updateModule(@RequestBody Module module) {
		return moduleservice.save(module);

	}

}
