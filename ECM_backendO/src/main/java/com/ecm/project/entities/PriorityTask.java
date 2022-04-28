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
public class PriorityTask implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;

	@OneToMany(mappedBy = "prioritytask")
	@JsonBackReference
	private List<Task> taks;

	public PriorityTask() {
		super();
	}

	public PriorityTask(long id, String name, List<Task> taks) {
		super();
		this.id = id;
		this.name = name;
		this.taks = taks;
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

	public List<Task> getTaks() {
		return taks;
	}

	public void setTaks(List<Task> taks) {
		this.taks = taks;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
