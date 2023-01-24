package com.ecm.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecm.user.entities.Administrator;

public interface AdministratorDao extends JpaRepository<Administrator, Long> {

}
