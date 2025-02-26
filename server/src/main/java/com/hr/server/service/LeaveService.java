package com.hr.server.service;

import com.hr.server.dto.LeaveDTO;
import com.hr.server.exception.ResourceNotFoundException;
import com.hr.server.model.Employee;
import com.hr.server.model.Leave;
import com.hr.server.repository.EmployeeRepository;
import com.hr.server.repository.LeaveRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveService(LeaveRepository leaveRepository, EmployeeRepository employeeRepository) {
        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
    }

    public Leave applyLeave(LeaveDTO leaveDTO) {
        Optional<Employee> employeeOpt = employeeRepository.findByEmail(leaveDTO.getEmail());
        if (!employeeOpt.isPresent()) {
            throw new ResourceNotFoundException("Employee not found for email: " + leaveDTO.getEmail());
        }

        Leave leave = new Leave();
        leave.setEmployee(employeeOpt.get());
        leave.setStartDate(leaveDTO.getStartDate());
        leave.setEndDate(leaveDTO.getEndDate());
        leave.setReason(leaveDTO.getReason());
        leave.setStatus(Leave.LeaveStatus.PENDING);

        return leaveRepository.save(leave);
    }

    public Leave approveLeave(Long leaveId) {
        return leaveRepository.findById(leaveId).map(leave -> {
            leave.setStatus(Leave.LeaveStatus.APPROVED);
            return leaveRepository.save(leave);
        }).orElseThrow(() -> new ResourceNotFoundException("Leave request not found with id: " + leaveId));
    }

    public Leave rejectLeave(Long leaveId) {
        return leaveRepository.findById(leaveId).map(leave -> {
            leave.setStatus(Leave.LeaveStatus.REJECTED);
            return leaveRepository.save(leave);
        }).orElseThrow(() -> new ResourceNotFoundException("Leave request not found with id: " + leaveId));
    }

    public List<LeaveDTO> getAllLeaves() {
        return leaveRepository.findAll().stream().map(leave -> 
            new LeaveDTO(
                leave.getLeaveId(),
                leave.getEmployee().getId(),
                leave.getEmployee().getEmail(),
                leave.getEmployee().getFirstName(),
                leave.getStartDate(),
                leave.getEndDate(),
                leave.getStatus(),
                leave.getReason()
            )
        ).collect(Collectors.toList());
    }

    public LeaveDTO getLeaveById(Long leaveId) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

        return new LeaveDTO(
                leave.getLeaveId(),
                leave.getEmployee().getId(),
                leave.getEmployee().getEmail(),
                leave.getEmployee().getFirstName(),
                leave.getStartDate(),
                leave.getEndDate(),
                leave.getStatus(),
                leave.getReason()
        );
    }

    public List<LeaveDTO> getLeavesByEmployeeEmail(String email) {
        return leaveRepository.findByEmployeeEmail(email).stream()
                .map(leave -> new LeaveDTO(
                        leave.getLeaveId(),
                        leave.getEmployee().getId(),
                        leave.getEmployee().getEmail(),
                        leave.getEmployee().getFirstName(),
                        leave.getStartDate(),
                        leave.getEndDate(),
                        leave.getStatus(),
                        leave.getReason()
                ))
                .collect(Collectors.toList());
    }
}
