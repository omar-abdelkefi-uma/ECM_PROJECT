package com.ecm.project.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecm.project.entities.Task;

public interface TaskDao extends JpaRepository<Task, Long> {
	@Query("SELECT task FROM Task task  where task.project.id =:idproject")
	List<Task> gettasksbyproject(@Param("idproject") long idproject);

}
