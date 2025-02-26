package com.hr.server.service;

import com.hr.server.model.Attendance;
import com.hr.server.repository.AttendanceRepository;
import com.hr.server.model.Employee;
import com.hr.server.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    // Method to mark attendance for an employee
    public Attendance markAttendance(Long employeeId, Attendance.AttendanceStatus status, String notes) {
        // Retrieve the employee to ensure they exist
        Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);
        if (employeeOpt.isEmpty()) {
            throw new IllegalArgumentException("Employee not found");
        }

        Employee employee = employeeOpt.get();

        // Create new attendance record
        Attendance attendance = Attendance.builder()
                .employee(employee)
                .date(new Date())  // Automatically set to today's date
                .status(status)
                .notes(notes)
                .build();

        // Save the attendance record
        return attendanceRepository.save(attendance);
    }

    // Method to get attendance records for a specific employee
    public List<Attendance> getAttendanceByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployee_Id(employeeId);
    }


}
