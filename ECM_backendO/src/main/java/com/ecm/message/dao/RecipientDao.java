package com.ecm.message.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecm.message.entities.Recipient;

public interface RecipientDao extends JpaRepository<Recipient, Long> {

}
