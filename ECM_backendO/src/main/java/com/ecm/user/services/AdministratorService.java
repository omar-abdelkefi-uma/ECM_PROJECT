package com.ecm.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecm.exception.ServiceExeption;
import com.ecm.user.dao.AdministratorDao;
import com.ecm.user.entities.Administrator;

@Service
public class AdministratorService {
	@Autowired
	AdministratorDao administratordao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	public Administrator save(Administrator Administrator) throws ServiceExeption {
		Administrator.setPassword(bcryptEncoder.encode(Administrator.getPassword()));
		Administrator.setType("admin");
		try {

		} catch (Exception e) {
			throw new ServiceExeption("error in database");
		}
		return administratordao.save(Administrator);

	}

	public Administrator update(Administrator Administrator) {
		Optional<Administrator> adm = administratordao.findById(Administrator.getId());
		Administrator.setPassword(adm.get().getPassword());
		return administratordao.save(Administrator);

	}

	public Optional<Administrator> find(Long id) {
		return administratordao.findById(id);
	}

	public List<Administrator> getAdministrators() {
		return administratordao.findAll();
	}

	public boolean delete(Long id) {
		administratordao.deleteById(id);
		return true;
	}

}
