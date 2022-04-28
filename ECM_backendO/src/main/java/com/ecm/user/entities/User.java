package com.ecm.user.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import com.ecm.message.entities.Message;
import com.ecm.message.entities.Recipient;
import com.ecm.project.entities.Ticket;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = true, updatable = true, unique = true, nullable = false)
	private long id;

	@Column(name = "username", unique = true, nullable = false)
	private String username;

	@Column(name = "password", nullable = false)
	private String password;
	private String fullname;
	@Temporal(TemporalType.DATE)
	private Date dateofbirth;

	private String gender;
	private String cin;
	private String city;
	private Long phone;

	@Column(name = "postal_code")
	private String postalCode;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "image_pro")
	private Image imageprofile;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Image> images;

	private String type;
	/** The lastlogin. */
	@Column(name = "lastlogin")
	private Date lastlogin;

	private Boolean isactive;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Document> documents;
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreation = new Date();

	@ManyToOne(fetch = FetchType.EAGER)
	private Role role;

	// tickets created
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Ticket> tickets;

	@Transient
	@JsonIgnore
	public String getNickName() {
		return "User";
	}

	@JsonIgnore
	@OneToMany
	private List<Message> message;
	@JsonIgnore
	@OneToMany
	private List<Recipient> recipients;

	public User() {
		super();
	}

	public User(long id, String username, String password, String fullname, Date dateofbirth, String gender, String cin,
			String city, Long phone, String postalCode, Image imageprofile, List<Image> images, String type,
			Date lastlogin, Boolean isactive, List<Document> documents, Date dateCreation, Role role,
			List<Ticket> tickets, List<Message> message, List<Recipient> recipients) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		this.dateofbirth = dateofbirth;
		this.gender = gender;
		this.cin = cin;
		this.city = city;
		this.phone = phone;
		this.postalCode = postalCode;
		this.imageprofile = imageprofile;
		this.images = images;
		this.type = type;
		this.lastlogin = lastlogin;
		this.isactive = isactive;
		this.documents = documents;
		this.dateCreation = dateCreation;
		this.role = role;
		this.tickets = tickets;
		this.message = message;
		this.recipients = recipients;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	// don't return password in response
	@JsonIgnore
	public String getPassword() {
		return password;
	}

	// set password in request
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

	public Date getLastlogin() {
		return lastlogin;
	}

	public void setLastlogin(Date lastlogin) {
		this.lastlogin = lastlogin;
	}

	public Boolean getIsactive() {
		return isactive;
	}

	public void setIsactive(Boolean isactive) {
		this.isactive = isactive;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Image getImageprofile() {
		return imageprofile;
	}

	public void setImageprofile(Image imageprofile) {
		this.imageprofile = imageprofile;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public Date getDateofbirth() {
		return dateofbirth;
	}

	public void setDateofbirth(Date dateofbirth) {
		this.dateofbirth = dateofbirth;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}

	public List<Message> getMessage() {
		return message;
	}

	public void setMessage(List<Message> message) {
		this.message = message;
	}

	public List<Recipient> getRecipients() {
		return recipients;
	}

	public void setRecipients(List<Recipient> recipients) {
		this.recipients = recipients;
	}

}
