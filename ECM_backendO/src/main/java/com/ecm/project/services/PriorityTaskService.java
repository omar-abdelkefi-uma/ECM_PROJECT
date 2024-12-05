package com.ecm.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.project.dao.PriorityTaskDao;
import com.ecm.project.entities.PriorityTask;

@Service
public class PriorityTaskService {
	@Autowired
	PriorityTaskDao PriorityTaskdao;

	public PriorityTask save(PriorityTask PriorityTask) {
		return PriorityTaskdao.save(PriorityTask);
	}

	public PriorityTask update(PriorityTask PriorityTask) {
		return PriorityTaskdao.save(PriorityTask);
	}

	public Optional<PriorityTask> find(Long id) {
		return PriorityTaskdao.findById(id);
	}

	public List<PriorityTask> getPriorityTasks() {
		return PriorityTaskdao.findAll();
	}

	public boolean delete(Long id) {
		PriorityTaskdao.deleteById(id);
		return true;
	}
}
