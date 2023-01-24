package com.ecm.user.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.user.entities.Document;

@Repository
@Transactional
public interface DocumentDao extends JpaRepository<Document, Long> {

	@Query("select d from Document d where d.user.id=:id")

	public List<Document> findByUserId(@Param("id") Long id);

	@Transactional
	@Modifying
	@Query("delete from Document d where d.user.id=:id")
	public void deleteByUserID(@Param("id") Long id);

	@Transactional
	@Modifying
	@Query("delete from Document d where d.id=:id")
	public void deleteById(@Param("id") Long id);

}
