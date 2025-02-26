package com.hr.server.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class EmployeeDTO {
    private long employeeId;
    private String firstName;
    private String lastName;
    private String profilePhoto;
    private String email;
    private String phoneNumber;
    private String departmentName; // Instead of department ID
    private String roleName; // Instead of role ID
    private Date hireDate;
    private double salary;
    private String gender;
    private String address;
    private Date birthdate;
    private String status;
}
