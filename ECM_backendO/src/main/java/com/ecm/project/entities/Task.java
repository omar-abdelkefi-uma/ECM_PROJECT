package com.ecm.project.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ecm.user.entities.Document;
import com.ecm.user.entities.Employee;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table
public class Task implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	private String code;
	private String status;
	private int level;
	// sart task
	@Temporal(TemporalType.DATE)
	private Date start;
	// end=start+duration
	@Temporal(TemporalType.DATE)
	private Date end;
	// end
	private long duration;
	private long previousphase;
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreation = new Date();
	@ManyToOne(fetch = FetchType.EAGER)
	private Project project;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Document document;

	@ManyToOne(fetch = FetchType.EAGER)
	private PriorityTask prioritytask;

	@ManyToOne(fetch = FetchType.EAGER)
	private TypeTask typetask;

	@ManyToOne(fetch = FetchType.EAGER)
	private Employee employee;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "id_phase")
	private Phase phase;

	public Task() {
		super();
	}

	public Task(long id, String name, String code, String status, int level, Date start, Date end, long duration,
			long previousphase, Date dateCreation, Project project, Document document, PriorityTask prioritytask,
			TypeTask typetask, Employee employee, Phase phase) {
		super();
		this.id = id;
		this.name = name;
		this.code = code;
		this.status = status;
		this.level = level;
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.previousphase = previousphase;
		this.dateCreation = dateCreation;
		this.project = project;
		this.document = document;
		this.prioritytask = prioritytask;
		this.typetask = typetask;
		this.employee = employee;
		this.phase = phase;
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

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Document getDocument() {
		return document;
	}

	public void setDocument(Document document) {
		this.document = document;
	}

	public PriorityTask getPrioritytask() {
		return prioritytask;
	}

	public void setPrioritytask(PriorityTask prioritytask) {
		this.prioritytask = prioritytask;
	}

	public TypeTask getTypetask() {
		return typetask;
	}

	public void setTypetask(TypeTask typetask) {
		this.typetask = typetask;
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

	public Phase getPhase() {
		return phase;
	}

	public void setPhase(Phase phase) {
		this.phase = phase;
	}

	public long getPreviousphase() {
		return previousphase;
	}

	public void setPreviousphase(long previousphase) {
		this.previousphase = previousphase;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

}
