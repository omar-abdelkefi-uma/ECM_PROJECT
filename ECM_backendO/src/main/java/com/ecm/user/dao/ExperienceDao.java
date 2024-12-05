package com.ecm.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.user.entities.Experience;

@Repository
public interface ExperienceDao extends JpaRepository<Experience, Long> {

}
