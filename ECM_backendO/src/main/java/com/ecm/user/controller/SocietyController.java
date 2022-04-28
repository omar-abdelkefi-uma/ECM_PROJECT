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

import com.ecm.user.entities.Society;
import com.ecm.user.services.SocietyService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class SocietyController {
	// Application Api
	@Autowired
	private SocietyService SocietyService;

	// ************************************Api
	// Society********************************************************//
	// add new Society
	@PostMapping("/society/add")
	public Society createSociety(@RequestBody Society Society) {
		return SocietyService.save(Society);
	}

	// Get All Societys
	@GetMapping("/society/liste")
	public List<Society> getSocietys() {
		return SocietyService.getSocietys();
	}

	// find by id
	@GetMapping("/society/{id}")
	public Optional<Society> getSociety(@PathVariable Long id) {
		return SocietyService.find(id);

	}

	// Delete Society
	@DeleteMapping("/society/delete/{id}")
	public boolean deleteSociety(@PathVariable long id) {
		SocietyService.delete(id);

		return true;
	}

	// update Society
	@PutMapping("/society/update")
	public Society updateSociety(@RequestBody Society Society) {
		return SocietyService.save(Society);

	}

}
