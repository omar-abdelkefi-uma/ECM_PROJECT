package com.ecm.user.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.user.dao.ExperienceDao;
import com.ecm.user.entities.Experience;

@Service
public class ExperienceService {
	@Autowired
	ExperienceDao experiences;

	public Experience save(Experience experience) {
		return experiences.save(experience);
	}

	public List<Experience> getexperience() {

		return experiences.findAll();
	}
}
