package com.ecm.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ecm.user.dao.EmployeeDao;
import com.ecm.user.entities.Employee;

@Service
public class EmployeeService {
	@Autowired
	EmployeeDao employeeDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	public Employee save(Employee Employee) {
		Employee.setPassword(bcryptEncoder.encode(Employee.getPassword()));
		Employee.setType("employee");
		return employeeDao.save(Employee);
	}

	public Employee update(Employee employee) {
		Optional<Employee> em = employeeDao.findById(employee.getId());
		employee.setPassword(em.get().getPassword());
		return employeeDao.save(employee);

	}

	public Optional<Employee> find(Long id) {
		return employeeDao.findById(id);
	}

	public List<Employee> getEmployees() {
		return employeeDao.findAll();
	}

	public boolean delete(Long id) {
		employeeDao.deleteById(id);
		return true;
	}

	public List<Employee> getProjectMangers() {

		return employeeDao.getprojectmanagers();
	}

	public List<Employee> getonlyEmployees() {
		return employeeDao.getonlyEmployees();
	}

}
