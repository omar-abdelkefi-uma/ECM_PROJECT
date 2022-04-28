package com.ecm.message.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ecm.user.entities.Document;
import com.ecm.user.entities.User;

@Entity
@Table
public class Message implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreation = new Date();

	@OneToMany(cascade = CascadeType.ALL)
	private List<Document> documents;

	public String content;
	// if recipient goupe you have to manage groupe
	@OneToOne(cascade = CascadeType.ALL)
	private Recipient recipient;

	@ManyToOne
	private User user;

	public Message() {
		super();
	}

	public Message(long id, Date dateCreation, List<Document> documents, String content, Recipient recipient,
			User user) {
		super();
		this.id = id;
		this.dateCreation = dateCreation;
		this.documents = documents;
		this.content = content;
		this.recipient = recipient;
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Recipient getRecipient() {
		return recipient;
	}

	public void setRecipient(Recipient recipient) {
		this.recipient = recipient;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
