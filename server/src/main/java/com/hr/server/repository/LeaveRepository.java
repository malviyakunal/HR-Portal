package com.hr.server.repository;

import com.hr.server.model.Leave;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.hr.server.model.Leave.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {
    
    // Find leave requests by Employee ID and Status
    List<Leave> findByEmployeeIdAndStatus(long employeeId, LeaveStatus status);

    // Fetch all leave requests for a specific employee
    List<Leave> findByEmployeeId(long employeeId);

    // Find a leave request by its ID
    Optional<Leave> findById(long leaveId);

    // Corrected Delete Query
    @Modifying
    @Transactional
    @Query("DELETE FROM Leave l WHERE l.employee.id = :employeeId")
    void deleteByEmployeeId(@Param("employeeId") long employeeId);
    
   
        
        // Find leave requests by Employee Email
        @Query("SELECT l FROM Leave l WHERE l.employee.email = :email")
        List<Leave> findByEmployeeEmail(@Param("email") String email);

        // Find leave requests by Employee Email and Status
        @Query("SELECT l FROM Leave l WHERE l.employee.email = :email AND l.status = :status")
        List<Leave> findByEmployeeEmailAndStatus(@Param("email") String email, @Param("status") Leave.LeaveStatus status);
    }

