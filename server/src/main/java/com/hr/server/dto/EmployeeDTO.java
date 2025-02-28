package com.hr.server.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

@Data
public class EmployeeDTO {
    private long employeeId;
    private String firstName;
    private String lastName;
    private MultipartFile profilePhoto;
    private String email;
    private String phoneNumber;
    private long departmentId;
    private String roleName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate hireDate;

    private double salary;
    private String gender;
    private String address;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthdate;

    private String status;
}
