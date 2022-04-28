package com.ecm.user.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecm.MyProperties;
import com.ecm.user.dao.PasswordResetTokenRepository;
import com.ecm.user.dao.UserDao;
import com.ecm.user.dto.MailRequest;
import com.ecm.user.entities.PasswordResetToken;
import com.ecm.user.entities.User;
import com.ecm.user.services.EmailService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/forgot-password")
public class PasswordForgotController {
	public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

	@Value("${jwt.secret}")
	private String secret;

	@Autowired
	MyProperties myProperties;

	@Autowired
	private UserDao userdao;
	@Autowired
	private PasswordResetTokenRepository tokenRepository;
	@Autowired
	private EmailService emailService;

	public static int emailExpirationPeriode; // in minutes

//	@ModelAttribute("forgotPasswordForm")
//	public PasswordForgotDto forgotPasswordDto() {
//		return new PasswordForgotDto();
//	}

	@GetMapping
	public String displayForgotPasswordPage() {
		return "forgot-password";
	}

	@PostMapping()
	public String sendEmail(@RequestBody Map object, BindingResult result, HttpServletRequest request) {
		System.out.print(object.get("username").toString());

		String username = object.get("username").toString();
		if (result.hasErrors()) {
			return "error";
		}

		User user = userdao.findByUsername(username);

		if (user == null) {
			// result.rejectValue("email", null, "We could not find an account for that
			// e-mail address.");

			// TODO log (email not found )
			return "error";

		}
		// local
		// String url1=request.getScheme() + "://" + request.getServerName() +
		// ":8081/#";

		// server
		String url1 = request.getScheme() + "://" + request.getServerName() + ":4200/#/user";

		PasswordResetToken token = new PasswordResetToken();
		Map<String, Object> claims = new HashMap<>();
		// set expiration of jwt
		String JWT = Jwts.builder().setClaims(claims).setSubject(user.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS512, secret).compact();

		token.setToken(JWT);
		token.setUser(user);

		// token.setExpiryDate(1440); //1 day
		token.setExpiryDate(myProperties.getEmailExpirationPeriode()); // 2 min
		// delete old token in database

		tokenRepository.deleteByUser_id(user.getId());

		tokenRepository.save(token);
		String url2 = "/newPassword/" + token.getToken();
		String url3 = url1 + url2;
		String url4 = url1 + "/login";
		String url5 = "#/newPassword/" + token.getToken();

		MailRequest mailRequest = new MailRequest();

		// out
		// mailRequest.setFrom("mourad.mallek@enis.tn");

		// Telnet
		mailRequest.setFrom("omarabdelkefi130@gmail.com");

		mailRequest.setSubject("Demande de réinitialisation du mot de passe");
		mailRequest.setTo(username);
		mailRequest.setName(user.getUsername());
		// resetUrland logInUrl location and ....==>variables pass to template

		Map<String, Object> model = new HashMap<>();
		model.put("Name", user.getUsername());
		model.put("location", "TUNISIA , sfax ");
		// url3=http://localhost:4200/#/newPassword/:token
		model.put("resetUrl", url3);
		model.put("logInUrl", url4);

		model.put("signature", "Telnet");
		model.put("expirationPeride", myProperties.getEmailExpirationPeriode());

		emailService.sendEmail(mailRequest, model);

		return url5;
	}

}
