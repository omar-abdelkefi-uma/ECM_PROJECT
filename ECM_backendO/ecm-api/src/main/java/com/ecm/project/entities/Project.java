package com.ecm.project.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ecm.user.entities.Client;
import com.ecm.user.entities.Employee;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
@Table
public class Project implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@OneToMany(mappedBy = "project")
	@JsonIgnore
	private List<Task> taks;

	private String name;
	private String code;
	private String status;
	private String description;
	// sart & and task
	@Temporal(TemporalType.DATE)
	private Date start;
	@Temporal(TemporalType.DATE)
	private Date end;
	private long duration;
	private float progress;

	@ManyToOne(fetch = FetchType.EAGER)
	private TypeProject typeproject;

	@OneToMany(mappedBy = "project")
	@JsonIgnore
	private List<Ticket> tickets;
	@OneToMany(mappedBy = "project")
	@JsonIgnore
	private List<Phase> phases;
	@ManyToOne(fetch = FetchType.EAGER)
	private Employee projectmanager;

	@ManyToMany
	@JoinTable(name = "project_employee", joinColumns = { @JoinColumn(name = "project_id") }, inverseJoinColumns = {
			@JoinColumn(name = "employee_id") })
	private List<Employee> employees;

	@ManyToOne(fetch = FetchType.EAGER)
	private Client client;

	public Project() {
		super();
	}

	public Project(long id, List<Task> taks, String name, String code, String status, String description, Date start,
			Date end, long duration, float progress, TypeProject typeproject, List<Ticket> tickets, List<Phase> phases,
			Employee projectmanager, List<Employee> employees, Client client) {
		super();
		this.id = id;
		this.taks = taks;
		this.name = name;
		this.code = code;
		this.status = status;
		this.description = description;
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.progress = progress;
		this.typeproject = typeproject;
		this.tickets = tickets;
		this.phases = phases;
		this.projectmanager = projectmanager;
		this.employees = employees;
		this.client = client;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<Task> getTaks() {
		return taks;
	}

	public void setTaks(List<Task> taks) {
		this.taks = taks;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getEnd() {
		return end;
	}

	public void setEnd(Date end) {
		this.end = end;
	}

	public long getDuration() {
		return duration;
	}

	public void setDuration(long duration) {
		this.duration = duration;
	}

	public float getProgress() {
		return progress;
	}

	public void setProgress(float progress) {
		this.progress = progress;
	}

	public TypeProject getTypeproject() {
		return typeproject;
	}

	public void setTypeproject(TypeProject typeproject) {
		this.typeproject = typeproject;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Employee getProjectmanager() {
		return projectmanager;
	}

	public void setProjectmanager(Employee projectmanager) {
		this.projectmanager = projectmanager;
	}

	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Phase> getPhases() {
		return phases;
	}

	public void setPhases(List<Phase> phases) {
		this.phases = phases;
	}

}
