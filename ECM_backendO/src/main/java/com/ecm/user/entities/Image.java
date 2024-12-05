package com.ecm.user.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table
public class Image implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Lob
	private byte[] imageid;

	public Image() {
		super();
	}

	public Image(Long id, byte[] imageid) {
		super();
		this.id = id;
		this.imageid = imageid;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getImageid() {
		return imageid;
	}

	public void setImageid(byte[] imageid) {
		this.imageid = imageid;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
