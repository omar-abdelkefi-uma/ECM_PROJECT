package com.ecm.project.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ecm.user.entities.Employee;
import com.ecm.user.entities.User;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table
public class Ticket implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String topic;
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreation = new Date();
	// start and end ticket
	@Temporal(TemporalType.DATE)
	private Date start;
	@Temporal(TemporalType.DATE)
	private Date end;
	private String status;
	private String priority;
	@ManyToOne(fetch = FetchType.EAGER)
	private Project project;

	@OneToMany(mappedBy = "ticket")
	@JsonBackReference
	private List<MessageTicket> messagetickets;

	// ticket creator
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;

	// assignto
	@ManyToOne(fetch = FetchType.EAGER)
	private Employee employee;

	public Ticket() {
		super();
	}

	public Ticket(long id, String topic, Date dateCreation, Date start, Date end, String status, String priority,
			Project project, List<MessageTicket> messagetickets, User user, Employee employee) {
		super();
		this.id = id;
		this.topic = topic;
		this.dateCreation = dateCreation;
		this.start = start;
		this.end = end;
		this.status = status;
		this.priority = priority;
		this.project = project;
		this.messagetickets = messagetickets;
		this.user = user;
		this.employee = employee;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public List<MessageTicket> getMessagetickets() {
		return messagetickets;
	}

	public void setMessagetickets(List<MessageTicket> messagetickets) {
		this.messagetickets = messagetickets;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

}
