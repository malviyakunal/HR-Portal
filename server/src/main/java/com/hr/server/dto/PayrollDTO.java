package com.hr.server.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class PayrollDTO {
	private long payrollId;
    private Date payrollMonth;
    private double salary;
    private double bonus;
    private double deductions;
    private double totalSalary;
    private long employeeId;  // Added employeeId to DTO
    private String employeeName;
}
