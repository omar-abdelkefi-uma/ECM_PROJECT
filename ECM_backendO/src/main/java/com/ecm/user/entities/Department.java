package com.ecm.user.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
public class Department implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name = "name")
	private String name;
	private String email;
	@ManyToOne
	private Society society;
	@OneToMany(mappedBy = "departments")
	@JsonIgnore
	private List<Employee> employee;

	public Department() {
		super();
	}

	public Department(Long id, String name, String email, Society society, List<Employee> employee) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.society = society;
		this.employee = employee;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Society getSociety() {
		return society;
	}

	public void setSociety(Society society) {
		this.society = society;
	}

	public List<Employee> getEmployee() {
		return employee;
	}

	public void setEmployee(List<Employee> employee) {
		this.employee = employee;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
