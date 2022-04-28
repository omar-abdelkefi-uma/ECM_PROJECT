package com.ecm.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecm.project.entities.PriorityTask;

public interface PriorityTaskDao extends JpaRepository<PriorityTask, Long> {

}