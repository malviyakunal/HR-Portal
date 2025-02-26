package com.hr.server.repository;

import com.hr.server.model.Department;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
  
    Optional<Department> findByDName(String dName);  
}
