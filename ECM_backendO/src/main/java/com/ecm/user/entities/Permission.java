package com.ecm.user.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;

import com.fasterxml.jackson.annotation.JsonBackReference;

//*********************************************************************************//
@Entity

public class Permission implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	private String permission_name;

	// bi-directional many-to-one association to Module
	@ManyToOne
	@JoinColumn(name = "module_id")

	private Module module;
	// bi-directional many-to-many association to Role
	@ManyToMany(mappedBy = "permissions", fetch = FetchType.EAGER)
	@JsonBackReference

	private List<Role> roles;

	public Permission() {
		super();
	}

	public Permission(Long id, String permission_name, Module module, List<Role> roles) {
		super();
		this.id = id;
		this.permission_name = permission_name;
		this.module = module;
		this.roles = roles;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPermission_name() {
		return permission_name;
	}

	public void setPermission_name(String permission_name) {
		this.permission_name = permission_name;
	}

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}