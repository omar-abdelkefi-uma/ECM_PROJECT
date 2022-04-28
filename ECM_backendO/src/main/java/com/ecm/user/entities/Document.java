package com.ecm.user.entities;

import java.io.Serializable;
import java.util.Arrays;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;

import org.hibernate.annotations.Type;

import com.ecm.message.entities.Message;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
@NamedQuery(name = "Document.findAll", query = "SELECT d FROM Document d")
public class Document implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String name;
	private String type;
	private long size;
	// bi-directional many-to-one association to User
	@JsonBackReference(value = "document")
	@ManyToOne
	private User user;
	@JsonBackReference(value = "message")
	@ManyToOne
	private Message message;
	@Lob
	// Save huge data
	@Column(columnDefinition = "LONGBLOB", name = "bytes")
	private byte[] bytes;

	public Document() {
		super();
	}

	public Document(long id, String name, String type, long size, User user, Message message, byte[] bytes) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.size = size;
		this.user = user;
		this.message = message;
		this.bytes = bytes;
	}

	public Document(String name, String type, byte[] bytes) {
		this.name = name;
		this.type = type;
		this.bytes = bytes;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public byte[] getBytes() {
		return this.bytes;
	}

	public void setBytes(byte[] bytes) {
		this.bytes = bytes;
	}

	public Message getMessage() {
		return message;
	}

	public void setMessage(Message message) {
		this.message = message;
	}

}