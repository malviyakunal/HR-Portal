package com.hr.server.controller;

import com.hr.server.dto.EmployeeDTO;
import com.hr.server.model.Employee;
import com.hr.server.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Create Employee
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Employee> createEmployee(
            @ModelAttribute EmployeeDTO employeeRequest) throws IOException {

        Employee savedEmployee = employeeService.createEmployee(employeeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    // Get All Employees
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    // Get Employee by ID
    @GetMapping("/get/{employeeId}")
    public ResponseEntity<Map<String, Object>> getEmployeeByyId(@PathVariable long employeeId) {
        Map<String, Object> employee = (Map<String, Object>) employeeService.getEmployeeByyId(employeeId);
        return employee != null 
                ? ResponseEntity.ok(employee) 
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Get Employee by Email
    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<Map<String, Object>> getEmployeeByEmail(@PathVariable String email) {
        Map<String, Object> employee = employeeService.getEmployeeByEmail(email);
        return employee != null
                ? ResponseEntity.ok(employee)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "❌ Employee not found with email: " + email));
    }

    // Update Employee
   
    @PutMapping(value = "/update/{employeeId}", consumes = "multipart/form-data")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable long employeeId,
            @ModelAttribute EmployeeDTO employeeDetails, // Handle both JSON and file
            @RequestParam(value = "profilePhoto", required = false) MultipartFile profilePhoto // File upload
    ) throws IllegalStateException, IOException {

        Employee updatedEmployee = employeeService.updateEmployee(employeeId, employeeDetails, profilePhoto);
        return updatedEmployee != null
                ? ResponseEntity.ok(updatedEmployee)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Delete Employee
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable long employeeId) {
        Employee employee = employeeService.getEmployeeById(employeeId);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Employee not found");
        }
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("✅ Employee deleted successfully");
    }
}
