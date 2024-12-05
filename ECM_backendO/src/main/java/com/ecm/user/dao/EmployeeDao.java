package com.ecm.user.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.ecm.user.entities.Employee;

public interface EmployeeDao extends JpaRepository<Employee, Long> {
	@Query("SELECT e FROM Employee e where e.projectmanager =  1 ")
	List<Employee> getprojectmanagers();

	@Query("SELECT e FROM Employee e where e.projectmanager =  0 ")
	List<Employee> getonlyEmployees();
}
