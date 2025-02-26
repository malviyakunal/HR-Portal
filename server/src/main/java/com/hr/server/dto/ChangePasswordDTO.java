package com.hr.server.dto;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordDTO {
    private String email;
    private String oldPassword;
    private String newPassword;
}
