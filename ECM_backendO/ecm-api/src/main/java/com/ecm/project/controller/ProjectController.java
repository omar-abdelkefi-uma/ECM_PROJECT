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

import com.ecm.project.entities.Project;
import com.ecm.project.services.ProjectService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProjectController {
	// Application Api
	@Autowired
	private ProjectService Projectservice;

	// ************************************Api
	// Project********************************************************//
	// add new Project
	@PostMapping("/project/add")
	public Project createProject(@RequestBody Project Project) {
		return Projectservice.save(Project);
	}

	// Get All Projects
	@GetMapping("/project/liste")
	public List<Project> getProjects() {
		return Projectservice.getProjects();
	}

	// find by id
	@GetMapping("/project/{id}")
	public Optional<Project> getProject(@PathVariable Long id) {
		return Projectservice.find(id);

	}

	// Delete Project
	@DeleteMapping("/project/delete/{id}")
	public boolean deleteProject(@PathVariable long id) {
		Projectservice.delete(id);

		return true;
	}

	// update Project
	@PutMapping("/project/update")
	public Project updateProject(@RequestBody Project Project) {
		return Projectservice.save(Project);

	}

}
