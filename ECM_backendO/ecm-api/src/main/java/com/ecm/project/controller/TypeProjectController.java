package com.ecm.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecm.project.entities.TypeProject;
import com.ecm.project.services.TypeProjectService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TypeProjectController {
	// Application Api
	@Autowired
	private TypeProjectService TypeProjectservice;

	// ************************************Api
	// TypeProject********************************************************//
	// add new TypeProject
	@PostMapping("/typeproject/add")
	public TypeProject createTypeProject(@RequestBody TypeProject TypeProject) {
		return TypeProjectservice.save(TypeProject);
	}

	// Get All TypeProjects
	@GetMapping("/typeproject/liste")
	public List<TypeProject> getTypeProjects() {
		return TypeProjectservice.getTypeProjects();
	}

	// find by id
	@GetMapping("/typeproject/{id}")
	public Optional<TypeProject> getTypeProject(@PathVariable Long id) {
		return TypeProjectservice.find(id);

	}

	// Delete TypeProject
	@DeleteMapping("/typeproject/delete/{id}")
	public boolean deleteTypeProject(@PathVariable long id) {
		TypeProjectservice.delete(id);

		return true;
	}

	// update TypeProject
	@PutMapping("/typeproject/update")
	public TypeProject updateTypeProject(@RequestBody TypeProject TypeProject) {
		return TypeProjectservice.save(TypeProject);

	}

}
