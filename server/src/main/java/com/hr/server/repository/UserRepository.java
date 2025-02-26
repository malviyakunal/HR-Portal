package com.hr.server.repository;

import com.hr.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find a user by email (used for authentication)
    Optional<User> findByEmail(String email);
    @Modifying
    @Transactional
    @Query("DELETE FROM User l WHERE l.employee.id = :employeeId")
    void deleteByEmployeeId(@Param("employeeId") long employeeId);
}