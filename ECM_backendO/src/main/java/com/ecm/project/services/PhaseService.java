package com.ecm.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.project.dao.PhaseDao;
import com.ecm.project.entities.Phase;
import com.ecm.project.entities.Task;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PhaseService {
	@Autowired
	PhaseDao Phasedao;
	@Autowired
	private TaskService Taskservice;

	public Phase save(Phase Phase) {
		return Phasedao.save(Phase);
	}

	public Phase update(Phase Phase) {
		return Phasedao.save(Phase);
	}

	public Optional<Phase> find(Long id) {
		return Phasedao.findById(id);
	}

	public List<Phase> getPhases() {
		return Phasedao.getlistPhase();
	}

	public Phase getrefusedPhase(String str) throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(str);
		long idproject = mapper.convertValue(node.get("idproject"), long.class);
		return Phasedao.getrefusedPhase(idproject);
	}

	public boolean delete(Long id) {
		Phasedao.deleteById(id);
		return true;
	}

	public boolean deleteandtr(String str) throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(str);
		long idproject = mapper.convertValue(node.get("idproject"), long.class);
		Phase phase = mapper.convertValue(node.get("phase"), Phase.class);
		List<Task> tasks = phase.getTasks();
		for (Task task : tasks) {
			task.setPhase(Phasedao.getrefusedPhase(idproject));
			Taskservice.update(task);
		}
		Phasedao.deleteById(phase.getId());
		return true;
	}

	public List<Phase> getPhasesByProject(String str) throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(str);
		long idproject = mapper.convertValue(node.get("idproject"), long.class);
		return Phasedao.getphasesbyproject(idproject);
	}
}