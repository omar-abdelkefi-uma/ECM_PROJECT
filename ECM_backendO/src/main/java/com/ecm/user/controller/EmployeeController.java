package com.ecm.user.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecm.exception.ServiceExeption;
import com.ecm.user.entities.Document;
import com.ecm.user.entities.Employee;
import com.ecm.user.services.EmployeeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;

	// Get All Employees
	// @PreAuthorize("hasRole('consult employee')")
	@GetMapping("/allemployees/liste")
	public List<Employee> getEmployees() {
		return employeeService.getEmployees();
	}

	// Get All All Employees withoutmanager
	@GetMapping("/employee/liste")
	public List<Employee> getEmployeeswithoutmanager() {
		return employeeService.getonlyEmployees();
	}

	// Get All Project Manger
	@GetMapping("/projectmanager/liste")
	public List<Employee> getProjectMangers() {
		return employeeService.getProjectMangers();
	}

	// find by id
	@GetMapping("/employee/{id}")
	public Optional<Employee> getEmployee(@PathVariable Long id) {
		return employeeService.find(id);

	}

	// Delete Employee
	@DeleteMapping("/employee/delete/{id}")
	public boolean deleteEmployee(@PathVariable long id) {
		employeeService.delete(id);

		return true;
	}

	// add new Employee
	@PostMapping(value = "/employee/create", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public void fileUpload(@RequestPart("files") List<MultipartFile> files, @RequestPart("employee") String admin)
			throws ServiceExeption, JsonMappingException, JsonProcessingException {

		List<Document> documents = new ArrayList<>();
		// convert string to administrator
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(admin);
		Employee employee = mapper.convertValue(node, Employee.class);
		if (!CollectionUtils.isEmpty(files)) {
			files.stream().forEach(file -> {
				try {
					Document filemode = new Document(file.getOriginalFilename(), file.getContentType(),
							file.getBytes());
					documents.add(filemode);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			});

		}
		if (!documents.isEmpty()) {
			System.out.print("Add documents");
			employee.setDocuments(documents);
		}

		employeeService.save(employee);

	}

	// update Employee
	@PutMapping("/employee/update")
	public Employee updateEmployee(@RequestBody Employee Employee) {
		return employeeService.update(Employee);

	}

}
