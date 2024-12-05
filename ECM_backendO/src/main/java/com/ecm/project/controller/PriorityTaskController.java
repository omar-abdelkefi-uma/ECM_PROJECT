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

import com.ecm.project.entities.PriorityTask;
import com.ecm.project.services.PriorityTaskService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class PriorityTaskController {
	// Application Api
	@Autowired
	private PriorityTaskService PriorityTaskservice;

	// ************************************Api
	// PriorityTask********************************************************//
	// add new PriorityTask
	@PostMapping("/prioritytask/add")
	public PriorityTask createPriorityTask(@RequestBody PriorityTask PriorityTask) {
		return PriorityTaskservice.save(PriorityTask);
	}

	// Get All PriorityTasks
	@GetMapping("/prioritytask/liste")
	public List<PriorityTask> getPriorityTasks() {
		return PriorityTaskservice.getPriorityTasks();
	}

	// find by id
	@GetMapping("/prioritytask/{id}")
	public Optional<PriorityTask> getPriorityTask(@PathVariable Long id) {
		return PriorityTaskservice.find(id);

	}

	// Delete PriorityTask
	@DeleteMapping("/prioritytask/delete/{id}")
	public boolean deletePriorityTask(@PathVariable long id) {
		PriorityTaskservice.delete(id);

		return true;
	}

	// update PriorityTask
	@PutMapping("/prioritytask/update")
	public PriorityTask updatePriorityTask(@RequestBody PriorityTask PriorityTask) {
		return PriorityTaskservice.save(PriorityTask);

	}

}
