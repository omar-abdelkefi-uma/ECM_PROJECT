package com.ecm.user.entities;

public class Notifications {

	private int count;
	private int id;

	public Notifications(int count) {
		this.count = count;
		this.id = 5;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
		this.id = 5;
	}

	public void increment() {
		this.count++;
		this.id = 5;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

}
