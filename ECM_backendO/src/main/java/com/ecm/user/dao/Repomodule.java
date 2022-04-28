package com.ecm.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ecm.user.entities.Module;

@Repository
public interface Repomodule extends JpaRepository<Module, Long> {

}
