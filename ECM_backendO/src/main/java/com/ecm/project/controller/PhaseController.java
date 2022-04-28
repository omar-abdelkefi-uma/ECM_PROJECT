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

import com.ecm.project.entities.Phase;
import com.ecm.project.entities.Task;
import com.ecm.project.services.PhaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class PhaseController {
	// Application Api
	@Autowired
	private PhaseService Phaseservice;

	// ************************************Api
	// Phase********************************************************//
	// add new Phase
	@PostMapping("/phase/add")
	public Phase createPhase(@RequestBody Phase Phase) {
		return Phaseservice.save(Phase);
	}

	@PostMapping("/phase/deletetr")
	public boolean deletePhaseandtr(@RequestBody String str) throws JsonMappingException, JsonProcessingException {
		Phaseservice.deleteandtr(str);
		return true;
	}

	// Get All Phases
	@GetMapping("/phase/liste")
	public List<Phase> getPhases() {
		return Phaseservice.getPhases();
	}

	// Get refused phase
	@PostMapping("/phase/refused")
	public Phase getRefusedPhases(@RequestBody String str) throws JsonMappingException, JsonProcessingException {
		return Phaseservice.getrefusedPhase(str);
	}

	// find by id
	@GetMapping("/phase/{id}")
	public Optional<Phase> getPhase(@PathVariable Long id) {
		return Phaseservice.find(id);

	}

	// Delete Phase
	@DeleteMapping("/phase/delete/{id}")
	public boolean deletePhase(@PathVariable long id) {
		Phaseservice.delete(id);

		return true;
	}

	// update Phase
	@PutMapping("/phase/update")
	public Phase updatePhase(@RequestBody Phase Phase) {
		return Phaseservice.save(Phase);

	}

	// update phase
	@PutMapping("/phase/updateList")
	public void updatePhase(@RequestBody List<Phase> phasesList) {
		for (Phase phase : phasesList) {
			Phaseservice.save(phase);
		}
	}

	// get phase by project
	@PostMapping("/phase/listebyproject")
	public List<Phase> getTaskByProject(@RequestBody String str) throws JsonMappingException, JsonProcessingException {

		return Phaseservice.getPhasesByProject(str);
	}
}
