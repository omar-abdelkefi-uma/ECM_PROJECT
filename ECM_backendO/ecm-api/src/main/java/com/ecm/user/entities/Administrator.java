package com.ecm.user.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Administrator extends User {

	private String administrator;
	// will be responsible all societies
	private boolean superadmin;
	@LazyCollection(LazyCollectionOption.FALSE)
	@ManyToMany
	@JoinTable(name = "admin_society", joinColumns = { @JoinColumn(name = "admin_id") }, inverseJoinColumns = {
			@JoinColumn(name = "society_id") })
	private List<Society> societies;
	@OneToMany(cascade = CascadeType.ALL)
	private List<Experience> experiences;

	public Administrator() {
		super();
	}

	public Administrator(String administrator, boolean superadmin, List<Society> societies,
			List<Experience> experiences) {
		super();
		this.administrator = administrator;
		this.superadmin = superadmin;
		this.societies = societies;
		this.experiences = experiences;
	}

	public List<Experience> getExperiences() {
		return experiences;
	}

	public void setExperiences(List<Experience> experiences) {
		this.experiences = experiences;
	}

	public boolean isSuperadmin() {
		return superadmin;
	}

	public void setSuperadmin(boolean superadmin) {
		this.superadmin = superadmin;
	}

	public String getAdministrator() {
		return administrator;
	}

	public void setAdministrator(String administrator) {
		this.administrator = administrator;
	}

	@Transient
	@Override
	@JsonIgnore
	public String getNickName() {
		return "Admin";
	}

	public List<Society> getSocieties() {
		return societies;
	}

	public void setSocieties(List<Society> societies) {
		this.societies = societies;
	}

}
