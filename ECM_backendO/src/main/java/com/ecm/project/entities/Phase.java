package com.ecm.project.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table
public class Phase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", insertable = true, updatable = true, unique = true, nullable = false)
	private long id;

	private String name;

	@Column(name = "order_id")
	private Long orderId;
	@OneToMany(mappedBy = "phase")
	private List<Task> tasks;
	@ManyToOne(fetch = FetchType.EAGER)
	private Project project;

	public Phase() {
		super();
	}

	public Phase(long id, String name, Long orderId, List<Task> tasks, Project project) {
		super();
		this.id = id;
		this.name = name;
		this.orderId = orderId;
		this.tasks = tasks;
		this.project = project;
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

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public void setId(long id) {
		this.id = id;
	}

}
