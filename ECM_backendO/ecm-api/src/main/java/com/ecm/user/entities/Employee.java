package com.ecm.user.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.ecm.project.entities.Project;
import com.ecm.project.entities.Task;
import com.ecm.project.entities.Ticket;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Employee extends User {

	private boolean projectmanager;
	@OneToMany(mappedBy = "employee")
	@JsonIgnore
	private List<Task> tasks;

	@ManyToOne
	private Department departments;

	@OneToMany(mappedBy = "projectmanager")
	@JsonIgnore
	private List<Project> projects;

	@ManyToMany(mappedBy = "employees")
	@JsonBackReference
	private List<Project> projectsofemployee;

	@Transient
	@Override
	@JsonIgnore
	public String getNickName() {
		return "Employee";
	}

	// tickets assigned
	@OneToMany(mappedBy = "employee")
	@JsonIgnore
	private List<Ticket> tickets;
	@OneToMany(cascade = CascadeType.ALL)
	private List<Experience> experiences;

	public Employee() {
		super();
	}

	public Employee(boolean projectmanager, List<Task> tasks, Department departments, List<Project> projects,
			List<Project> projectsofemployee, List<Ticket> tickets, List<Experience> experiences) {
		super();
		this.projectmanager = projectmanager;
		this.tasks = tasks;
		this.departments = departments;
		this.projects = projects;
		this.projectsofemployee = projectsofemployee;
		this.tickets = tickets;
		this.experiences = experiences;
	}

	public Department getDepartments() {
		return departments;
	}

	public void setDepartments(Department departments) {
		this.departments = departments;
	}

	public List<Experience> getExperiences() {
		return experiences;
	}

	public void setExperiences(List<Experience> experiences) {
		this.experiences = experiences;
	}

	public boolean isProjectmanager() {
		return projectmanager;
	}

	public void setProjectmanager(boolean projectmanager) {
		this.projectmanager = projectmanager;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public List<Project> getProjectsofemployee() {
		return projectsofemployee;
	}

	public void setProjectsofemployee(List<Project> projectsofemployee) {
		this.projectsofemployee = projectsofemployee;
	}

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

}
