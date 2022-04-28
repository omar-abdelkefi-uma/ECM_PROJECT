package com.ecm.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecm.user.dao.AdministratorDao;
import com.ecm.user.dao.ClientDao;
import com.ecm.user.dao.EmployeeDao;
import com.ecm.user.dao.UserDao;
import com.ecm.user.entities.Administrator;
import com.ecm.user.entities.Client;
import com.ecm.user.entities.Employee;
import com.ecm.user.entities.Permission;
import com.ecm.user.entities.User;

@Service
public class UserService {
	@Autowired
	private PasswordEncoder bcryptEncoder;
	@Autowired
	UserDao userdao;
	@Autowired
	EmployeeDao employeeDao;
	@Autowired
	ClientDao clientDao;
	@Autowired
	AdministratorDao administratordao;

	public User save(User User) {
		User.setPassword(bcryptEncoder.encode(User.getPassword()));
		User.setType("user");
		return userdao.save(User);
	}

	public void update(User user) {
		System.out.print("update user servise");
		if (user.getType().equals("admin")) {
			System.out.print("type admin");
			Optional<Administrator> adm = administratordao.findById(user.getId());
			Administrator admin = adm.get();
			System.out.print("password = " + user.getImages().get(0).getImageid());
			// change images
			admin.setImages(user.getImages());
			administratordao.save(admin);
		}
		if (user.getType().equals("client")) {
			System.out.print("type client");
			Optional<Client> cl = clientDao.findById(user.getId());
			Client client = cl.get();
			// change images
			client.setImages(user.getImages());
			clientDao.save(client);
		}
		if (user.getType().equals("employee")) {
			System.out.print("typeemployee");
			Optional<Employee> emp = employeeDao.findById(user.getId());
			Employee employee = emp.get();
			// change images
			employee.setImages(user.getImages());
			employeeDao.save(employee);
		}

	}

	public Optional<User> find(Long id) {
		return userdao.findById(id);
	}

	public List<User> getUsers() {
		return userdao.findAll();
	}

	public boolean delete(Long id) {
		userdao.deleteById(id);
		return true;
	}

	public List<Permission> findPermissionByUsername(String username) {
		User per = userdao.findByUsername(username);
		return per.getRole().getPermissions();
	}

}
