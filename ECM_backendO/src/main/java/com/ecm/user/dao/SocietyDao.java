package com.ecm.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecm.user.entities.Society;

public interface SocietyDao extends JpaRepository<Society, Long> {

}
