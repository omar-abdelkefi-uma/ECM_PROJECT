package com.ecm.user.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
public class Society implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name = "name")
	private String name;
	private String country;
	private String city;
	private String address;
	private String phone;
	private String fax;
	private String postalCode;
	@OneToOne(cascade = CascadeType.ALL)
	private Image logo;
	private String email;
	@ManyToMany(mappedBy = "societies", fetch = FetchType.EAGER)
	@JsonIgnore
	private List<Administrator> admins;

	@JsonBackReference
	@OneToMany(mappedBy = "society")
	private List<Department> department;

	public Society() {
		super();
	}

	public Society(Long id, String name, String country, String city, String address, String phone, String fax,
			String postalCode, Image logo, String email, List<Administrator> admins, List<Department> department) {
		super();
		this.id = id;
		this.name = name;
		this.country = country;
		this.city = city;
		this.address = address;
		this.phone = phone;
		this.fax = fax;
		this.postalCode = postalCode;
		this.logo = logo;
		this.email = email;
		this.admins = admins;
		this.department = department;
	}

	public List<Administrator> getAdmins() {
		return admins;
	}

	public void setAdmins(List<Administrator> admins) {
		this.admins = admins;
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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public Image getLogo() {
		return logo;
	}

	public void setLogo(Image logo) {
		this.logo = logo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public List<Department> getDepartment() {
		return department;
	}

	public void setDepartment(List<Department> department) {
		this.department = department;
	}

}
