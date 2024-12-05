package com.ecm.user.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecm.user.dao.Repopermission;
import com.ecm.user.dao.UserDao;
import com.ecm.user.dto.UserDTO;
import com.ecm.user.entities.Permission;
import com.ecm.user.entities.User;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userDao;
	@Autowired
	Repopermission repopermi;
	@Autowired
	private PasswordEncoder bcryptEncoder;

	// The most interesting method
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				getUserAuthority());
	}

	public List<Permission> getPermissions() {
		List<Permission> permissions = new ArrayList<>();
		repopermi.findAll().forEach(permissions::add);
		return permissions;

	}

	private List<GrantedAuthority> getUserAuthority() {
		Set<GrantedAuthority> roles = new HashSet<>();

		getPermissions().forEach((permission) -> {
			roles.add(new SimpleGrantedAuthority(permission.getPermission_name()));
		});

		List<GrantedAuthority> grantedAuthorities = new ArrayList<>(roles);
		return grantedAuthorities;
	}

	public User save(UserDTO user) {
		User newUser = new User();
		newUser.setUsername(user.getUsername());
		// password cripté
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userDao.save(newUser);
	}

}