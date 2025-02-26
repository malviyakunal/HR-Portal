package com.hr.server.dto;

import com.hr.server.model.Leave;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveDTO {
    private Long leaveId;
    private Long employeeId;
    private String email; 
    private String employeeName;
    private Date startDate;
    private Date endDate;
    private Leave.LeaveStatus status;
    private String reason;
}
