package com.ecm.user.dto;

import java.util.Date;
import java.util.List;

public class MailRequest {

	private String name;
	private String to;
	private String from;
	private String subject;

	private List<String> toList;
	private List<String> toCCList;
	private List<String> toBCCList;

	private String place;
	private String TimeBegin;
	private String TimeEnd;
	private Date date;

	private String emailBody;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public List<String> getToList() {
		return toList;
	}

	public void setToList(List<String> toList) {
		this.toList = toList;
	}

	public List<String> getToCCList() {
		return toCCList;
	}

	public void setToCCList(List<String> toCCList) {
		this.toCCList = toCCList;
	}

	public List<String> getToBCCList() {
		return toBCCList;
	}

	public void setToBCCList(List<String> toBCCList) {
		this.toBCCList = toBCCList;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getTimeBegin() {
		return TimeBegin;
	}

	public void setTimeBegin(String timeBegin) {
		TimeBegin = timeBegin;
	}

	public String getTimeEnd() {
		return TimeEnd;
	}

	public void setTimeEnd(String timeEnd) {
		TimeEnd = timeEnd;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getEmailBody() {
		return emailBody;
	}

	public void setEmailBody(String emailBody) {
		this.emailBody = emailBody;
	}

}
