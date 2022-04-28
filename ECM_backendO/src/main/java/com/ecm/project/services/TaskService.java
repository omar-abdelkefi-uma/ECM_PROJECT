package com.ecm.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.project.dao.PhaseDao;
import com.ecm.project.dao.TaskDao;
import com.ecm.project.entities.Phase;
import com.ecm.project.entities.Task;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TaskService {
	@Autowired
	TaskDao Taskdao;
	@Autowired
	PhaseDao Phasedao;

	public Task save(Task Task) {
		return Taskdao.save(Task);
	}

	public Task update(Task Task) {
		return Taskdao.save(Task);
	}

	public Optional<Task> find(Long id) {
		return Taskdao.findById(id);
	}

	public List<Task> getTasks() {
		return Taskdao.findAll();
	}

	public boolean delete(Long id) {
		Taskdao.deleteById(id);
		return true;
	}

	public void refuse(String str) throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(str);
		long idproject = mapper.convertValue(node.get("idproject"), long.class);
		Task task = mapper.convertValue(node.get("task"), Task.class);
		task.setPreviousphase(task.getPhase().getId());
		task.setPhase(Phasedao.getrefusedPhase(idproject));
		Taskdao.save(task);
	}

	public void returntask(Task task) {
		Optional<Phase> previousphase = Phasedao.findById(task.getPreviousphase());
		task.setPhase(previousphase.get());
		Taskdao.save(task);
	}

	public List<Task> getTaskByProject(String str) throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(str);
		long idproject = mapper.convertValue(node.get("idproject"), long.class);

		return Taskdao.gettasksbyproject(idproject);
	}
}
