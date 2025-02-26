package com.hr.server.service;

import com.hr.server.dto.PayrollDTO;
import com.hr.server.exception.ResourceNotFoundException;
import com.hr.server.model.Employee;
import com.hr.server.model.Payroll;
import com.hr.server.repository.EmployeeRepository;
import com.hr.server.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Method to get Payroll details by Employee's first name
    public PayrollDTO getPayrollByFirstName(String firstName) {
        Payroll payroll = payrollRepository.findByEmployeeFirstName(firstName)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll not found for employee with first name " + firstName));

        Employee employee = payroll.getEmployee();  // Get the employee associated with the payroll

        return new PayrollDTO(
                payroll.getPayrollId(),
                payroll.getPayrollMonth(),
                payroll.getSalary(),
                payroll.getBonus(),
                payroll.getDeductions(),
                payroll.getTotalSalary(),
                employee.getId(),  // employeeId
                employee.getFirstName() + " " + employee.getLastName()  // employeeName
        );
    }

    // Method to create or update payroll for an employee
    public Payroll updateOrCreatePayroll(Long employeeId, Double salary, Double bonus, Double deductions) {
        // Get the employee (ensuring they exist)
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID " + employeeId));

        // Check if payroll exists for this employee
        Optional<Payroll> payrollList = payrollRepository.findByEmployeeId(employeeId);  // Returns List<Payroll>

        Payroll payroll;
        if (payrollList.isEmpty()) {
            // If no payroll exists for this employee, create a new payroll entry
            payroll = new Payroll(); // New Payroll object if not found
            payroll.setPayrollMonth(new Date()); // Set current date as payroll month
            payroll.setEmployee(employee);  // Link employee
        } else {
            // If payroll exists, use the first one in the list (you can adjust logic if you expect multiple payrolls)
            payroll = payrollList.get();
        }

        // Calculate total salary
        Double totalSalary = salary + bonus - deductions;

        // Set payroll details
        payroll.setSalary(salary);
        payroll.setBonus(bonus);
        payroll.setDeductions(deductions);
        payroll.setTotalSalary(totalSalary);

        // Save payroll entry
        payroll = payrollRepository.save(payroll);

        // Update employee salary field
        employee.setSalary(salary);
        employeeRepository.save(employee);

        return payroll;
    }

    // Method to update payroll details
    public Payroll updatePayroll(Long payrollId, Double salary, Double bonus, Double deductions) {
        // Find payroll record by ID
        Payroll payroll = payrollRepository.findById(payrollId)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll not found with id " + payrollId));

        // Calculate total salary
        Double totalSalary = salary + bonus - deductions;

        // Update payroll details
        payroll.setSalary(salary);
        payroll.setBonus(bonus);
        payroll.setDeductions(deductions);
        payroll.setTotalSalary(totalSalary);

        // Save payroll record
        payrollRepository.save(payroll);

        // Also update employee salary
        Employee employee = payroll.getEmployee();
        if (employee != null) {
            employee.setSalary(salary);  // Sync salary with payroll
            employeeRepository.save(employee);
        }

        return payroll;
    }

    public List<PayrollDTO> getPayrollsByEmployeeId(Long employeeId) {
        Optional<Payroll> payrolls = payrollRepository.findByEmployeeId(employeeId); // Assuming this method exists in repository
        return payrolls.stream().map(payroll -> 
            new PayrollDTO(
                payroll.getPayrollId(),
                payroll.getPayrollMonth(),
                payroll.getSalary(),
                payroll.getBonus(),
                payroll.getDeductions(),
                payroll.getTotalSalary(),
                payroll.getEmployee().getId(), // employeeId
                payroll.getEmployee().getFirstName() + " " + payroll.getEmployee().getLastName() // employeeName
            )
        ).collect(Collectors.toList());
    }

    // Method to get all payroll records and return as list of PayrollDTOs
    public List<PayrollDTO> getAllPayrolls() {
        List<Payroll> payrolls = payrollRepository.findAll();

        return payrolls.stream()
                .map(payroll -> {
                    Employee employee = payroll.getEmployee();
                    return new PayrollDTO(
                            payroll.getPayrollId(),
                            payroll.getPayrollMonth(),
                            payroll.getSalary(),
                            payroll.getBonus(),
                            payroll.getDeductions(),
                            payroll.getTotalSalary(),
                            employee.getId(),  // employeeId
                            employee.getFirstName() + " " + employee.getLastName()  // employeeName
                    );
                })
                .collect(Collectors.toList());
    }
}
