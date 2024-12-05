package com.ecm.user.dto;

import java.io.Serializable;

import com.ecm.user.entities.User;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;

	private User user;

	public JwtResponse(String jwttoken, User user) {
		super();
		this.jwttoken = jwttoken;
		this.user = user;
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

	public String getJwttoken() {
		return jwttoken;
	}

	public JwtResponse(String jwttoken) {
		this.jwttoken = jwttoken;
	}

	public String getToken() {
		return this.jwttoken;
	}
}
