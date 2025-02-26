package com.hr.server.repository;

import com.hr.server.model.Payroll;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    // You can define custom queries if needed. Example:
     Optional<Payroll> findByEmployeeId(long employeeId);
     // Custom query to find payroll by employee's first name
     Optional<Payroll> findByEmployeeFirstName(String firstName);
     @Modifying
     @Transactional
     @Query("DELETE FROM Payroll a WHERE a.employee.id = :employeeId")
     void deleteByEmployeeId(@Param("employeeId") long employeeId);

     
}
