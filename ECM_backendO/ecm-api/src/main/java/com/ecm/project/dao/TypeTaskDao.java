package com.ecm.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecm.project.entities.TypeTask;

public interface TypeTaskDao extends JpaRepository<TypeTask, Long> {

}
