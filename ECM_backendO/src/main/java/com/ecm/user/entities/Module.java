package com.ecm.user.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

//*********************************************************************************//
@Entity
public class Module implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "module_name")
	private String moduleName;
	// bi-directional many-to-one association to Permission
	@OneToMany(mappedBy = "module")
	@JsonBackReference
	private List<Permission> permissions;

	public Module() {
		super();
	}

	public Module(Long id, String moduleName, List<Permission> permissions) {
		super();

		this.moduleName = moduleName;
		this.permissions = permissions;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public List<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}