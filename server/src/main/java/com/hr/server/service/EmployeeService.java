package com.hr.server.service;

import com.hr.server.dto.EmployeeDTO;
import com.hr.server.exception.ResourceNotFoundException;
import com.hr.server.model.Department;
import com.hr.server.model.Employee;
import com.hr.server.model.Employee.EmployeeStatus;
import com.hr.server.model.Employee.Gender;
import com.hr.server.model.Role;
import com.hr.server.model.User;
import com.hr.server.repository.*;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    public Employee createEmployee(EmployeeDTO employeeRequest) throws java.io.IOException {
        Department department = departmentRepository.findById(employeeRequest.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("❌ Department not found"));

        Role role = roleRepository.findByRoleName(employeeRequest.getRoleName())
                .orElseThrow(() -> new ResourceNotFoundException("❌ Role not found"));

        Employee employee = new Employee();
        employee.setFirstName(employeeRequest.getFirstName());
        employee.setLastName(employeeRequest.getLastName());
        employee.setEmail(employeeRequest.getEmail());
        employee.setPhoneNumber(employeeRequest.getPhoneNumber());
        employee.setDepartment(department);
        employee.setRole(role);
        employee.setHireDate(employeeRequest.getHireDate());
        employee.setSalary(employeeRequest.getSalary());
        employee.setGender(Gender.valueOf(employeeRequest.getGender()));
        employee.setAddress(employeeRequest.getAddress());
        employee.setBirthdate(employeeRequest.getBirthdate());
        employee.setStatus(EmployeeStatus.valueOf(employeeRequest.getStatus()));

        // 🔹 Handle Profile Photo Upload
        MultipartFile profilePhoto = employeeRequest.getProfilePhoto();
        if (profilePhoto != null && !profilePhoto.isEmpty()) {
            try {
                String uploadDir = "uploads/profile-photos/";
                Files.createDirectories(Paths.get(uploadDir));

                String fileName = System.currentTimeMillis() + "_" + profilePhoto.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);
                Files.write(filePath, profilePhoto.getBytes());

                employee.setProfilePhoto(Files.readAllBytes(filePath)); // Save in DB as byte[]
            } catch (IOException e) {
                throw new RuntimeException("❌ Failed to store profile photo", e);
            }
        }

        return employeeRepository.save(employee);
    }
    public Employee getEmployeeById(long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("❌ Employee not found with ID: " + employeeId));
    }

    public Employee updateEmployee(long employeeId, EmployeeDTO employeeDetails, MultipartFile profilePhoto) throws java.io.IOException {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("❌ Employee not found with ID: " + employeeId));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setPhoneNumber(employeeDetails.getPhoneNumber());
        employee.setHireDate(employeeDetails.getHireDate());
        employee.setSalary(employeeDetails.getSalary());
        employee.setGender(Gender.valueOf(employeeDetails.getGender()));
        employee.setAddress(employeeDetails.getAddress());
        employee.setBirthdate(employeeDetails.getBirthdate());
        employee.setStatus(EmployeeStatus.valueOf(employeeDetails.getStatus()));
     
        if (profilePhoto != null && !profilePhoto.isEmpty()) {
            employee.setProfilePhoto(profilePhoto.getBytes());
        }
        
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("❌ Employee not found with ID: " + employeeId));

        attendanceRepository.deleteByEmployeeId(employeeId);
        leaveRepository.deleteByEmployeeId(employeeId);
        payrollRepository.deleteByEmployeeId(employeeId);

        employeeRepository.delete(employee);
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
        if (employee.getProfilePhoto() != null) {
            String base64Image = Base64.getEncoder().encodeToString(employee.getProfilePhoto());
            empData.put("profilePhoto", "data:image/jpeg;base64," + base64Image);
        } else {
            empData.put("profilePhoto", null);
        }
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


    public Map<String, Object> getEmployeeByyId(long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("❌ Employee not found"));

        // ✅ Employee details in Map format
        Map<String, Object> empData = new HashMap<>();
        empData.put("employeeId", employee.getId());
        empData.put("firstName", employee.getFirstName());
        empData.put("lastName", employee.getLastName());
//        empData.put("profilePhoto", employee.getProfilePhoto());
        if (employee.getProfilePhoto() != null) {
            String base64Image = Base64.getEncoder().encodeToString(employee.getProfilePhoto());
            empData.put("profilePhoto", "data:image/jpeg;base64," + base64Image);
        } else {
            empData.put("profilePhoto", null);
        }
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


public List<Map<String, Object>> getAllEmployees() {
    List<Employee> employees = employeeRepository.findAll();
    List<Map<String, Object>> employeeList = new ArrayList<>();

    for (Employee employee : employees) {
        Map<String, Object> empData = new HashMap<>();
        empData.put("employeeId", employee.getId());
        empData.put("firstName", employee.getFirstName());
        empData.put("lastName", employee.getLastName());

        // 🔹 Convert Byte Array to Base64 String
        if (employee.getProfilePhoto() != null) {
            String base64Image = Base64.getEncoder().encodeToString(employee.getProfilePhoto());
            empData.put("profilePhoto", "data:image/jpeg;base64," + base64Image);
        } else {
            empData.put("profilePhoto", null);
        }

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
}}
   