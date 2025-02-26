package com.hr.server.controller;

import com.hr.server.dto.LeaveDTO;
import com.hr.server.exception.ResourceNotFoundException;
import com.hr.server.model.Leave;
import com.hr.server.service.LeaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> applyLeave(@RequestBody LeaveDTO leaveDTO) {
        try {
            Leave appliedLeave = leaveService.applyLeave(leaveDTO);
            return ResponseEntity.status(201).body(appliedLeave);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/approve/{leaveId}")
    public ResponseEntity<?> approveLeave(@PathVariable Long leaveId) {
        try {
            Leave approvedLeave = leaveService.approveLeave(leaveId);
            return ResponseEntity.ok(approvedLeave);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/reject/{leaveId}")
    public ResponseEntity<?> rejectLeave(@PathVariable Long leaveId) {
        try {
            Leave rejectedLeave = leaveService.rejectLeave(leaveId);
            return ResponseEntity.ok(rejectedLeave);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<LeaveDTO>> getAllLeaves() {
        List<LeaveDTO> leaves = leaveService.getAllLeaves();
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/{leaveId}")
    public ResponseEntity<?> getLeaveById(@PathVariable Long leaveId) {
        try {
            LeaveDTO leave = leaveService.getLeaveById(leaveId);
            return ResponseEntity.ok(leave);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ FIX: Changed from @RequestParam to @PathVariable
    @GetMapping("/employee/{email}")
    public ResponseEntity<List<LeaveDTO>> getLeavesByEmployee(@PathVariable String email) {
        List<LeaveDTO> leaves = leaveService.getLeavesByEmployeeEmail(email);
        if (leaves.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(leaves);
    }
}
