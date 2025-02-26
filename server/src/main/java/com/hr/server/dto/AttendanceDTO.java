package com.hr.server.dto;

import lombok.Data;

import java.util.Date;

@Data
public class AttendanceDTO {
    private long employeeId;
    private String status;  // Values can be 'PRESENT', 'ABSENT', 'LATE'
    private String notes;  // Optional notes
}
