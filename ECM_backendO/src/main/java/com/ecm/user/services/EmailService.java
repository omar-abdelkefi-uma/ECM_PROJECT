package com.ecm.user.services;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.ecm.user.dto.MailRequest;
import com.ecm.user.dto.MailResponse;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender sender;

	@Autowired
	private Configuration config;

	@Value("${spring.mail.host}")
	private String host;
	@Value("${spring.mail.port}")
	private String port;

	@Value("${spring.mail.username}")
	private String username;

	@Value("${spring.mail.password}")
	private String password;

	@Value("${spring.mail.properties.mail.smtp.starttls.enable}")
	private String enable;

	String res;
	String hhBegin;
	String mmBegin;
	String hhEnd;
	String mmEnd;

	public MailResponse sendEmail(MailRequest request, Map<String, Object> model) {
		MailResponse response = new MailResponse();
		MimeMessage message = sender.createMimeMessage();
		try {

			// set mediaType
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			// add attachment
			// helper.addAttachment("logo.png", new ClassPathResource("logo.png"));

			// Template t = config.getTemplate("email-template-telnet.html");
			Template t = config.getTemplate("email-template.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

			helper.setTo(request.getTo());
			helper.setText(html, true);
			helper.setSubject(request.getSubject());
			helper.setFrom(request.getFrom());
			System.out.print(request.getFrom());
			System.out.print(request.getTo());
			helper.addInline("myLogo", new ClassPathResource("./templates/images/Telnet-Logo.jpg"));
			//logo attachement
			//helper.addInline("myLogo2", new ClassPathResource("./templates/images/favicons.jpg"));

			sender.send(message);

			response.setMessage("mail send to : " + request.getTo());
			response.setStatus(Boolean.TRUE);

		} catch (MessagingException | IOException | TemplateException e) {
			response.setMessage("Mail Sending failure : " + e.getMessage());
			response.setStatus(Boolean.FALSE);
		}

		return response;
	}

	public MailResponse sendEmailClient(MailRequest request, Map<String, Object> model) {
		MailResponse response = new MailResponse();
		MimeMessage message = sender.createMimeMessage();
		try {

			// set mediaType
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			// add attachment
			// helper.addAttachment("logo.png", new ClassPathResource("logo.png"));

			// Template t = config.getTemplate("email-template-telnet.html");
			Template t = config.getTemplate("client.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

			helper.setTo(request.getTo());
			helper.setText(html, true);
			helper.setSubject(request.getSubject());
			helper.setFrom(request.getFrom());
			System.out.print(request.getFrom());
			System.out.print(request.getTo());
			helper.addInline("myLogo", new ClassPathResource("./templates/images/Telnet-Logo.jpg"));
			helper.addInline("myLogo2", new ClassPathResource("./templates/images/favicons.jpg"));

			sender.send(message);

			response.setMessage("mail send to : " + request.getTo());
			response.setStatus(Boolean.TRUE);

		} catch (MessagingException | IOException | TemplateException e) {
			response.setMessage("Mail Sending failure : " + e.getMessage());
			response.setStatus(Boolean.FALSE);
		}

		return response;
	}

	public MailResponse sendEmailInterview(MailRequest request) {
		MailResponse response = new MailResponse();

		try {
			Properties prop = new Properties();
			prop.put("mail.smtp.port", port);
			prop.put("mail.smtp.host", host);

			prop.put("spring.mail.username", username);

			prop.put("spring.mail.password", password);

			prop.put("spring.mail.properties.mail.smtp.starttls.enable", enable);

			Session session = Session.getDefaultInstance(prop);
			// Define message
			MimeMessage message = new MimeMessage(session);

			message.setSubject(request.getSubject());
			message.setFrom(new InternetAddress(request.getFrom()));

			// To get the array of toaddresses
			res = "";
			for (int i = 0; i < request.getToList().size(); i++) {
				if (i == 0) {
					res = request.getToList().get(i);
				} else {
					res = res + "," + request.getToList().get(i);
				}

			}
			InternetAddress[] myToList = InternetAddress.parse(res);
			message.setRecipients(Message.RecipientType.TO, myToList);

			if (request.getToCCList() != null) {
				// To get the array of ccaddresses
				res = "";
				for (int i = 0; i < request.getToCCList().size(); i++) {
					if (i == 0) {
						res = request.getToCCList().get(i);
					} else {
						res = res + "," + request.getToCCList().get(i);
					}

				}

				InternetAddress[] myToCCList = InternetAddress.parse(res);
				message.setRecipients(Message.RecipientType.CC, myToCCList);

			}

			if (request.getToBCCList() != null) {
				// To get the array of bccaddresses
				res = "";
				for (int i = 0; i < request.getToBCCList().size(); i++) {
					if (i == 0) {
						res = request.getToBCCList().get(i);
					} else {
						res = res + "," + request.getToBCCList().get(i);
					}

				}
				InternetAddress[] myBccList = InternetAddress.parse(res);
				message.setRecipients(Message.RecipientType.BCC, myBccList);

			}

			StringBuffer sb = new StringBuffer();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
			String format = formatter.format(request.getDate());

			hhBegin = (Integer.parseInt(request.getTimeBegin().split(":")[0]) - 3) + "";
			mmBegin = request.getTimeBegin().split(":")[1];
			hhEnd = (Integer.parseInt(request.getTimeEnd().split(":")[0]) - 3) + "";
			mmEnd = request.getTimeEnd().split(":")[1];

			// T000000Z ==> 3:00
			// ThhmmssZ ==> hh = heurs � ajouter a 3:00 / mm : minutes / ss : second
			StringBuffer buffer = sb.append("BEGIN:VCALENDAR\n" + "METHOD:REQUEST\n" + "BEGIN:VEVENT\n"
					+ "ATTENDEE;ROLE=REQ-PARTICIPANT;RSVP=TRUE:MAILTO:" + request.getToList().get(0) + "\n"
					+ "ORGANIZER:MAILTO:" + username + "\n" + "DTSTART:" + format + "T" + hhBegin + mmBegin + "00Z\n"
					+ "DTEND:" + format + "T" + hhEnd + mmEnd + "00Z\n" + "LOCATION:" + request.getPlace() + "\n"
					+ "TRANSP:OPAQUE\n" + "SEQUENCE:0\n"
					+ "UID:040000008200E00074C5B7101A82E00800000000002FF466CE3AC5010000000000000000100\n"
					+ " 000004377FE5C37984842BF9440448399EB02\n" + "DTSTAMP:20051206T120102Z\n" + "CATEGORIES:Meeting\n"
					+ "DESCRIPTION:" + request.getEmailBody() + "\n\n" + "SUMMARY:" + request.getSubject() + "\n"
					+ "PRIORITY:5\n" + "CLASS:PUBLIC\n" + "END:VEVENT\n" + "END:VCALENDAR");

			// Create the message part
			BodyPart messageBodyPart = new MimeBodyPart();

			// Fill the message
			messageBodyPart.setHeader("Content-Class", "urn:content-  classes:calendarmessage");
			messageBodyPart.setHeader("Content-ID", "calendar_message");
			messageBodyPart
					.setDataHandler(new DataHandler(new ByteArrayDataSource(buffer.toString(), "text/calendar")));// very
																													// important

			// Create a Multipart
			Multipart multipart = new MimeMultipart();

			// Add part one
			multipart.addBodyPart(messageBodyPart);

			// Put parts in message
			message.setContent(multipart);

			// send message
			Transport.send(message);

		} catch (MessagingException me) {
			me.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return response;
	}

}
