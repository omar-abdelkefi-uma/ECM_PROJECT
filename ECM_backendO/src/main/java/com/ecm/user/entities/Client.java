package com.ecm.user.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.ecm.project.entities.Project;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Client extends User implements Serializable {
	private static final long serialVersionUID = 1L;
	@OneToMany(mappedBy = "client")
	@JsonIgnore
	private List<Project> project;

	public Client() {
		super();
	}

	public Client(List<Project> project) {
		super();
		this.project = project;
	}

	public List<Project> getProject() {
		return project;
	}

	public void setProject(List<Project> project) {
		this.project = project;
	}

	@Transient
	@Override
	@JsonIgnore
	public String getNickName() {
		return "Client";
	}

}
