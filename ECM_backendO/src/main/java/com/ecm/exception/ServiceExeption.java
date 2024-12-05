package com.ecm.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ServiceExeption extends Exception {

	private static final long serialVersionUID = 1L;

	public ServiceExeption(String message) {
		super(message);
	}
}
