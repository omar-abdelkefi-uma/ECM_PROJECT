package com.ecm.user.dao;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.user.entities.PasswordResetToken;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
	@Transactional
	Long deleteByUser_id(Long id);

	PasswordResetToken findByToken(String token);

}