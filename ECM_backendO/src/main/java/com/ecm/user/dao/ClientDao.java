package com.ecm.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecm.user.entities.Client;

public interface ClientDao extends JpaRepository<Client, Long> {

}
