package com.ecm.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.user.entities.Permission;

@Repository
public interface Repopermission extends JpaRepository<Permission, Long> {

}
