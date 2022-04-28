package com.ecm.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.user.entities.Role;

@Repository
public interface Reporole extends JpaRepository<Role, Long> {

}
