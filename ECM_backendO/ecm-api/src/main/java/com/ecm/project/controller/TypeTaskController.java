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
import com.ecm.project.entities.TypeTask;
import com.ecm.project.services.TypeTaskService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TypeTaskController {
	// Application Api
	@Autowired
	private TypeTaskService TypeTaskservice;

	// ************************************Api
	// TypeTask********************************************************//
	// add new TypeTask
	@PostMapping("/typetask/add")
	public TypeTask createTypeTask(@RequestBody TypeTask TypeTask) {
		return TypeTaskservice.save(TypeTask);
	}

	// Get All TypeTasks
	@GetMapping("/typetask/liste")
	public List<TypeTask> getTypeTasks() {
		return TypeTaskservice.getTypeTasks();
	}

	// find by id
	@GetMapping("/typetask/{id}")
	public Optional<TypeTask> getTypeTask(@PathVariable Long id) {
		return TypeTaskservice.find(id);

	}

	// Delete TypeTask
	@DeleteMapping("/typetask/delete/{id}")
	public boolean deleteTypeTask(@PathVariable long id) {
		TypeTaskservice.delete(id);

		return true;
	}

	// update TypeTask
	@PutMapping("/typetask/update")
	public TypeTask updateTypeTask(@RequestBody TypeTask TypeTask) {
		return TypeTaskservice.save(TypeTask);

	}

}
