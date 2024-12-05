package com.ecm.project.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table
public class MessageTicket implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String status;
	private String priority;
	private String message;

	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreation = new Date();

	@Temporal(TemporalType.DATE)
	private Date lastmodification;

	@ManyToOne(fetch = FetchType.EAGER)
	private Ticket ticket;

	public MessageTicket() {
		super();
	}

	public MessageTicket(long id, String status, String priority, String message, Date dateCreation,
			Date lastmodification, Ticket ticket) {
		super();
		this.id = id;
		this.status = status;
		this.priority = priority;
		this.message = message;
		this.dateCreation = dateCreation;
		this.lastmodification = lastmodification;
		this.ticket = ticket;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public Date getLastmodification() {
		return lastmodification;
	}

	public void setLastmodification(Date lastmodification) {
		this.lastmodification = lastmodification;
	}

	public Ticket getTicket() {
		return ticket;
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
