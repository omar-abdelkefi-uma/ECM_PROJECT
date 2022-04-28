package com.ecm.user.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecm.user.entities.Department;
import com.ecm.user.services.DepartmentService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class DepartmentController {
	// Application Api
	@Autowired
	private DepartmentService DepartmentService;

	// ************************************Api
	// Department********************************************************//
	// add new Department
	@PostMapping("/department/add")
	public Department createDepartment(@RequestBody Department Department) {
		return DepartmentService.save(Department);
	}

	// Get All Departments
	@GetMapping("/department/liste")
	public List<Department> getDepartments() {
		return DepartmentService.getDepartments();
	}

	// find by id
	@GetMapping("/department/{id}")
	public Optional<Department> getDepartment(@PathVariable Long id) {
		return DepartmentService.find(id);

	}

	// Delete Department
	@DeleteMapping("/department/delete/{id}")
	public boolean deleteDepartment(@PathVariable long id) {
		DepartmentService.delete(id);

		return true;
	}

	// update Department
	@PutMapping("/department/update")
	public Department updateDepartment(@RequestBody Department Department) {
		return DepartmentService.save(Department);

	}

}
