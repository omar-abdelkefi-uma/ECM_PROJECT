package com.ecm.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecm.project.entities.Project;

public interface ProjectDao extends JpaRepository<Project, Long> {

}