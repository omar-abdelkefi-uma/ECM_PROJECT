package com.ecm.message.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.ecm.user.entities.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
public class Recipient implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private boolean containgroup;

	@ManyToOne
	private User user;

	@JsonIgnore
	@OneToOne
	private Message message;

	public Recipient() {
		super();
	}

	public Recipient(long id, boolean containgroup, User user, Message message) {
		super();
		this.id = id;
		this.containgroup = containgroup;
		this.user = user;
		this.message = message;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Message getMessage() {
		return message;
	}

	public void setMessage(Message message) {
		this.message = message;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public boolean isContaingroup() {
		return containgroup;
	}

	public void setContaingroup(boolean containgroup) {
		this.containgroup = containgroup;
	}

}
