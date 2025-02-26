package com.hr.server.controller;

import com.hr.server.dto.PayrollDTO;
import com.hr.server.model.Payroll;
import com.hr.server.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    // Update payroll for a specific employee
    @PutMapping("/update/{employeeId}")
    public ResponseEntity<PayrollDTO> updatePayroll(
            @PathVariable Long employeeId,
            @RequestBody Payroll payrollRequest) {

        Payroll updatedPayroll = payrollService.updateOrCreatePayroll(
                employeeId,
                payrollRequest.getSalary(),
                payrollRequest.getBonus(),
                payrollRequest.getDeductions()
        );

        PayrollDTO payrollDTO = new PayrollDTO(
                updatedPayroll.getPayrollId(),
                updatedPayroll.getPayrollMonth(),
                updatedPayroll.getSalary(),
                updatedPayroll.getBonus(),
                updatedPayroll.getDeductions(),
                updatedPayroll.getTotalSalary(),
                updatedPayroll.getEmployee().getId(),  // employeeId
                updatedPayroll.getEmployee().getFirstName() + " " + updatedPayroll.getEmployee().getLastName()  // employeeName
        );

        return ResponseEntity.ok(payrollDTO);
    }

    // Get Payroll details by payroll ID
    @GetMapping("/{payrollId}")
    public ResponseEntity<List<PayrollDTO>> getPayrollById(@PathVariable Long payrollId) {
        List<PayrollDTO> payrollDTO = payrollService.getPayrollsByEmployeeId(payrollId);
        return ResponseEntity.ok(payrollDTO);
    }

    // Get Payroll details by employee's first name
    @GetMapping("/employee/first-name/{firstName}")
    public ResponseEntity<PayrollDTO> getPayrollByFirstName(@PathVariable String firstName) {
        PayrollDTO payrollDTO = payrollService.getPayrollByFirstName(firstName);
        return ResponseEntity.ok(payrollDTO);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<PayrollDTO>> getAllPayrollByEmployeeId(@PathVariable Long employeeId) {
        List<PayrollDTO> payrollDTOs = payrollService.getPayrollsByEmployeeId(employeeId); // Updated service call
        return ResponseEntity.ok(payrollDTOs);
    }

}
