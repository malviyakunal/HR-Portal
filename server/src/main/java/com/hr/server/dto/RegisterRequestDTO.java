package com.hr.server.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Integer departmentId;
    private Integer roleId;
}
