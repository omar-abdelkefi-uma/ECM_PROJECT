package com.ecm.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.project.dao.PhaseDao;
import com.ecm.project.dao.ProjectDao;
import com.ecm.project.entities.Phase;
import com.ecm.project.entities.Project;

@Service
public class ProjectService {
	@Autowired
	ProjectDao Projectdao;
	@Autowired
	PhaseDao Phasedao;

	public Project save(Project Project) {
		Project project = Projectdao.save(Project);
		Phase Phase = new Phase();
		Phase.setName("refused");
		Phase.setOrderId((long) 0);
		Phase.setProject(project);
		Phasedao.save(Phase);
		return project;

	}

	public Project update(Project Project) {
		return Projectdao.save(Project);
	}

	public Optional<Project> find(Long id) {
		return Projectdao.findById(id);
	}

	public List<Project> getProjects() {
		return Projectdao.findAll();
	}

	public boolean delete(Long id) {
		Projectdao.deleteById(id);
		return true;
	}
}
