package com.ecm.project.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table
public class TypeProject implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;

	@OneToMany(mappedBy = "typeproject")
	@JsonBackReference
	private List<Project> projects;

	public TypeProject() {
		super();
	}

	public TypeProject(long id, String name, List<Project> projects) {
		super();
		this.id = id;
		this.name = name;
		this.projects = projects;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
