package com.ecm.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.user.entities.Department;

@Repository
public interface DepartmentDao extends JpaRepository<Department, Long> {

}
