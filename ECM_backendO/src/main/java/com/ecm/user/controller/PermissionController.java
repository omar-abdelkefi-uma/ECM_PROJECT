package com.ecm.user.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecm.user.entities.Permission;
import com.ecm.user.services.PermissionService;

@RestController
@RequestMapping("/api")

public class PermissionController {
	@Autowired
	private PermissionService permissionservice;

	// ***********************************Api
	// permission******************************************************//
	// Get All permissions
	@GetMapping("/getpermission")
	public List<Permission> getPermissions() {
		return permissionservice.getPermissions();
	}

	// find by id
	@GetMapping("/permission/{id}")
	public Optional<Permission> getPermission(@PathVariable Long id) {
		return permissionservice.find(id);

	}

	// Delete permission
	@DeleteMapping("/permission/delete/{id}")
	public boolean deletePermission(@PathVariable long id) {
		permissionservice.delete(id);

		return true;
	}

	// add new permmision
	@PostMapping("/permission/add")
	public Permission createPermission(@RequestBody Permission permission) {
		return permissionservice.save(permission);
	}

	// update permission
	@PutMapping("/permission/update")
	public Permission updatePermission(@RequestBody Permission permission) {
		return permissionservice.save(permission);

	}
}
