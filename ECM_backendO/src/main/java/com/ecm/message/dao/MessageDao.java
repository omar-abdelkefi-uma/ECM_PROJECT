package com.ecm.message.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecm.message.entities.Message;

public interface MessageDao extends JpaRepository<Message, Long> {
	@Query("SELECT m FROM Message m where (m.user.id=:iduser or m.recipient.user.id =:iduser) and m.recipient.containgroup=0")
	List<Message> findMessageofConnectedUser(@Param("iduser") long iduser);
}
