package com.ecm.user.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@NamedQuery(name = "Experience.findAll", query = "SELECT e FROM Experience e")
public class Experience implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String company;

	private String duration;

	private String position;

	// bi-directional many-to-one association to User
	@JsonBackReference(value = "expadmin")
	@ManyToOne
	private Administrator admin;

	// bi-directional many-to-one association to User
	@JsonBackReference(value = "expemployee")
	@ManyToOne
	private Employee employee;

	public Experience() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCompany() {
		return this.company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getPosition() {
		return this.position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public Experience(long id, String company, String duration, String position, Administrator admin,
			Employee employee) {
		super();
		this.id = id;
		this.company = company;
		this.duration = duration;
		this.position = position;
		this.admin = admin;
		this.employee = employee;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Administrator getAdmin() {
		return admin;
	}

	public void setAdmin(Administrator admin) {
		this.admin = admin;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
