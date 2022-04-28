package com.ecm;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties
@PropertySource("file:./src/main/resources/application.properties")
public class MyProperties {

	int emailExpirationPeriode;
	long tokenExpirationPeriode;
	double expirationPeriodCookies;

	public double getExpirationPeriodCookies() {
		return expirationPeriodCookies;
	}

	public void setExpirationPeriodCookies(double expirationPeriodCookies) {
		this.expirationPeriodCookies = expirationPeriodCookies;
	}

	public int getEmailExpirationPeriode() {
		return emailExpirationPeriode;
	}

	public void setEmailExpirationPeriode(int emailExpirationPeriode) {
		this.emailExpirationPeriode = emailExpirationPeriode;
	}

	public long getTokenExpirationPeriode() {
		return tokenExpirationPeriode;
	}

	public void setTokenExpirationPeriode(long tokenExpirationPeriode) {
		this.tokenExpirationPeriode = tokenExpirationPeriode;
	}
}
