package com.ecm.project.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecm.project.entities.Phase;
import com.ecm.project.entities.Task;

public interface PhaseDao extends JpaRepository<Phase, Long> {
	// don't get refused phase
	@Query("SELECT ph FROM Phase ph  where ph.orderId != 0 ")
	List<Phase> getlistPhase();

	@Query("SELECT ph FROM Phase ph  where ph.orderId = 0 and ph.project.id =:idproject ")
	Phase getrefusedPhase(@Param("idproject") long idproject);

	// get phases by project
	@Query("SELECT ph FROM Phase ph  where ph.project.id =:idproject and ph.orderId != 0")
	List<Phase> getphasesbyproject(@Param("idproject") long idproject);
}
