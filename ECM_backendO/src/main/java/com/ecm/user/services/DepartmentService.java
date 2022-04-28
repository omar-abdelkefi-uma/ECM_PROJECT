package com.ecm.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecm.user.dao.DepartmentDao;
import com.ecm.user.entities.Department;

@Service
public class DepartmentService {
	@Autowired
	DepartmentDao departmentDao;

	public Department save(Department Department) {
		return departmentDao.save(Department);
	}

	public Department update(Department Department) {
		return departmentDao.save(Department);
	}

	public Optional<Department> find(Long id) {
		return departmentDao.findById(id);
	}

	public List<Department> getDepartments() {
		return departmentDao.findAll();
	}

	public boolean delete(Long id) {
		departmentDao.deleteById(id);
		return true;
	}

}
