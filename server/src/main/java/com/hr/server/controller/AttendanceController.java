package com.hr.server.controller;


import com.hr.server.dto.AttendanceDTO;
import com.hr.server.model.Attendance;
import com.hr.server.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    // Constructor injection for AttendanceService
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    // Mark attendance for an employee using AttendanceRequest DTO
    @PostMapping("/mark")
    public ResponseEntity<Attendance> markAttendance(@RequestBody AttendanceDTO request) {
        // Convert the status from string to AttendanceStatus enum
        Attendance.AttendanceStatus status = Attendance.AttendanceStatus.valueOf(request.getStatus().toUpperCase());

        // Call service to mark attendance
        Attendance createdAttendance = attendanceService.markAttendance(request.getEmployeeId(), status, request.getNotes());
        return ResponseEntity.status(201).body(createdAttendance);  // Return created attendance with 201 status
    }

    // Get attendance records for an employee
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getEmployeeAttendance(@PathVariable Long employeeId) {
        List<Attendance> attendanceList = attendanceService.getAttendanceByEmployee(employeeId);
        if (attendanceList.isEmpty()) {
            return ResponseEntity.notFound().build();  // Return 404 if no attendance records found
        }
        return ResponseEntity.ok(attendanceList);  // Return attendance records for the employee
    }
}
