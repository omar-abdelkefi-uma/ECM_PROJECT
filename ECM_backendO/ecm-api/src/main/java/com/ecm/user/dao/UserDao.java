package com.ecm.user.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.user.entities.User;

public interface UserDao extends JpaRepository<User, Long> {
	@Query("SELECT u FROM User u where u.username=:username")
	User findByUsername(@Param("username") String username);

	@Query("SELECT p FROM User p where p.username=:username and p.password =:password")
	User findUserBynamepass(@Param("username") String username, @Param("password") String password);

	// to modify a record in db add two annotations
	@Transactional
	@Modifying
	@Query("UPDATE User p SET p.password = :password WHERE p.id = :id")
	void updatePassword(@Param("password") String password, @Param("id") Long id);
	
	List<User> findByFullname(String fullname);
	
	User findByGender(String fullname);
}
