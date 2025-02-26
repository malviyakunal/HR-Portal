package com.hr.server.service;

import com.hr.server.exception.ResourceNotFoundException;
import com.hr.server.model.Department;
import com.hr.server.model.Employee;
import com.hr.server.model.Role;
import com.hr.server.model.User;
import com.hr.server.repository.*;

import io.jsonwebtoken.io.IOException;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private LeaveRepository leaveRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Create Employee
 // Create Employee
    public Employee createEmployee(Employee employee) {
        // 🔥 Find department by departmentId
        Department department = departmentRepository.findById(employee.getDepartment().getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("❌ Department not found"));

        // 🔥 Find role by roleName
        Role role = roleRepository.findByRoleName(employee.getRole().getRoleName())
                .orElseThrow(() -> new ResourceNotFoundException("❌ Role not found"));

        // ✅ Assign existing department & role
        employee.setDepartment(department);
        employee.setRole(role);

        // ✅ Save Employee
        employee = employeeRepository.save(employee);

        // 🔥 Create & Save User
        String defaultPassword = "Welcome@123";
        String encodedPassword = passwordEncoder.encode(defaultPassword);

        User user = new User();
        user.setEmail(employee.getEmail());
        user.setPassword(encodedPassword);
        user.setRole(role);
        user.setEmployee(employee);

        userRepository.save(user);

        // ✅ Associate Employee with User & Save Again
        employee.setUser(user);
        return employeeRepository.save(employee);
    }

    // Fetch employee by ID
    public Employee getEmployeeById(long employeeId) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        return employee.orElseThrow(() -> new ResourceNotFoundException("❌ Employee not found with ID: " + employeeId));
    }

    // Fetch employee by Email
    public Map<String, Object> getEmployeeByEmail(String email) {
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("❌ Employee not found with Email: " + email));

        // Convert employee to a Map for response
        Map<String, Object> empData = new HashMap<>();
        empData.put("employeeId", employee.getId());
        empData.put("firstName", employee.getFirstName());
        empData.put("lastName", employee.getLastName());
        empData.put("profilePhoto", employee.getProfilePhoto());
        empData.put("email", employee.getEmail());
        empData.put("phoneNumber", employee.getPhoneNumber());
        empData.put("hireDate", employee.getHireDate());
        empData.put("salary", employee.getSalary());
        empData.put("gender", employee.getGender());
        empData.put("address", employee.getAddress());
        empData.put("birthdate", employee.getBirthdate());
        empData.put("status", employee.getStatus());

        // Include department & role names
        if (employee.getDepartment() != null) {
            empData.put("departmentName", employee.getDepartment().getDName());
        } else {
            empData.put("departmentName", "N/A");
        }

        if (employee.getRole() != null) {
            empData.put("roleName", employee.getRole().getRoleName());
        } else {
            empData.put("roleName", "N/A");
        }

        return empData;
    }

    // Fetch all employees
    public List<Map<String, Object>> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        List<Map<String, Object>> employeeList = new ArrayList<>();

        for (Employee employee : employees) {
            Map<String, Object> empData = new HashMap<>();
            empData.put("employeeId", employee.getId());
            empData.put("firstName", employee.getFirstName());
            empData.put("lastName", employee.getLastName());
            empData.put("profilePhoto", employee.getProfilePhoto());
            empData.put("email", employee.getEmail());
            empData.put("phoneNumber", employee.getPhoneNumber());
            empData.put("hireDate", employee.getHireDate());
            empData.put("salary", employee.getSalary());
            empData.put("gender", employee.getGender());
            empData.put("address", employee.getAddress());
            empData.put("birthdate", employee.getBirthdate());
            empData.put("status", employee.getStatus());

            // Include department & role names
            empData.put("departmentName", (employee.getDepartment() != null) ? employee.getDepartment().getDName() : "N/A");
            empData.put("roleName", (employee.getRole() != null) ? employee.getRole().getRoleName() : "N/A");

            employeeList.add(empData);
        }

        return employeeList;
    }

    public Employee updateEmployee(long employeeId, Employee employeeDetails, MultipartFile profilePhoto) throws java.io.IOException {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("❌ Employee not found with ID: " + employeeId));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setPhoneNumber(employeeDetails.getPhoneNumber());
        employee.setHireDate(employeeDetails.getHireDate());
        employee.setSalary(employeeDetails.getSalary());
        employee.setGender(employeeDetails.getGender());
        employee.setAddress(employeeDetails.getAddress());
        employee.setBirthdate(employeeDetails.getBirthdate());
        employee.setStatus(employeeDetails.getStatus());

        if (profilePhoto != null && !profilePhoto.isEmpty()) {
            employee.setProfilePhoto(profilePhoto.getBytes());
        }

        return employeeRepository.save(employee);
    }



    // Delete Employee
    public void deleteEmployee(long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("❌ Employee not found with ID: " + employeeId));

        // Delete related records
        attendanceRepository.deleteByEmployeeId(employeeId);
        leaveRepository.deleteByEmployeeId(employeeId);
        payrollRepository.deleteByEmployeeId(employeeId);

        // Delete employee
        employeeRepository.delete(employee);
    }
    
    public Map<String, Object> getEmployeeByyId(long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("❌ Employee not found"));

        // ✅ Employee details in Map format
        Map<String, Object> empData = new HashMap<>();
        empData.put("employeeId", employee.getId());
        empData.put("firstName", employee.getFirstName());
        empData.put("lastName", employee.getLastName());
        empData.put("profilePhoto", employee.getProfilePhoto());
        empData.put("email", employee.getEmail());
        empData.put("phoneNumber", employee.getPhoneNumber());
        empData.put("hireDate", employee.getHireDate());
        empData.put("salary", employee.getSalary());
        empData.put("gender", employee.getGender());
        empData.put("address", employee.getAddress());
        empData.put("birthdate", employee.getBirthdate());
        empData.put("status", employee.getStatus());

        // ✅ Ensure department & role names are included
        if (employee.getDepartment() != null) {
            empData.put("departmentName", employee.getDepartment().getDName());
        } else {
            empData.put("departmentName", "N/A");
        }

        if (employee.getRole() != null) {
            empData.put("roleName", employee.getRole().getRoleName());
        } else {
            empData.put("roleName", "N/A");
        }

        return empData;
    }
//    public void updateProfilePhoto(long employeeId, MultipartFile profilePhoto) throws java.io.IOException {
//        Employee employee = employeeRepository.findById(employeeId)
//                .orElseThrow(() -> new ResourceNotFoundException("❌ Employee not found with ID: " + employeeId));
//
//        if (profilePhoto == null || profilePhoto.isEmpty()) {
//            throw new RuntimeException("❌ No image file provided");
//        }
//
//        try {
//            // Generate a unique file name
//            String fileName = UUID.randomUUID().toString() + "_" + profilePhoto.getOriginalFilename();
//            String uploadDir = "uploads/"; // Specify your upload directory
//
//            // Save the file
//            Path filePath = Paths.get(uploadDir + fileName);
//            Files.copy(profilePhoto.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//            // Update employee profile photo field
//            employee.setProfilePhoto(fileName);
//            employeeRepository.save(employee);
//        } catch (IOException e) {
//            throw new RuntimeException("❌ Failed to save image");
//        }
//    }
}


