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

import com.ecm.project.entities.Task;
import com.ecm.project.services.TaskService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TaskController {

	// Application Api
	@Autowired
	private TaskService Taskservice;

	// ************************************Api
	// Task********************************************************//
	// add new Task
	@PostMapping("/task/add")
	public Task createTask(@RequestBody Task Task) {
		return Taskservice.save(Task);
	}

	// Get All Tasks
	@GetMapping("/task/liste")
	public List<Task> getTasks() {
		return Taskservice.getTasks();
	}

	// find by id
	@GetMapping("/task/{id}")
	public Optional<Task> getTask(@PathVariable Long id) {
		return Taskservice.find(id);

	}

	// Delete Task
	@DeleteMapping("/task/delete/{id}")
	public boolean deleteTask(@PathVariable long id) {
		Taskservice.delete(id);

		return true;
	}

	// update Task
	@PutMapping("/task/update")
	public Task updateTask(@RequestBody Task Task) {
		return Taskservice.save(Task);

	}

	// refuse Task
	@PutMapping("/task/refuse")
	public void refuseTask(@RequestBody String str) throws JsonMappingException, JsonProcessingException {
		Taskservice.refuse(str);

	}

	// refuse Task
	@PutMapping("/task/return")
	public void returnTask(@RequestBody Task Task) {
		Taskservice.returntask(Task);

	}

	// get task by project
	@PostMapping("/task/listebyproject")
	public List<Task> getTaskByProject(@RequestBody String str) throws JsonMappingException, JsonProcessingException {

		return Taskservice.getTaskByProject(str);
	}
}
