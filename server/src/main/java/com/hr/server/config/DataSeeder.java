//package com.hr.server.config;
//
//import com.hr.server.model.Department;
//import com.hr.server.model.Employee;
//import com.hr.server.model.Role;
//import com.hr.server.model.User;
//import com.hr.server.repository.DepartmentRepository;
//import com.hr.server.repository.EmployeeRepository;
//import com.hr.server.repository.RoleRepository;
//import com.hr.server.repository.UserRepository;
//
//import java.sql.Date;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//import jakarta.transaction.Transactional;
//
//@Component
//public class DataSeeder implements CommandLineRunner {
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private DepartmentRepository departmentRepository;
//
//    @Autowired
//    private EmployeeRepository employeeRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Override
//    @Transactional // Ensures atomicity in database operations
//    public void run(String... args) throws Exception {
//        if (roleRepository.count() == 0) {
//            System.out.println("🔹 Seeding Initial Data...");
//
//            // ✅ Check if role already exists
//            Optional<Role> existingRole = roleRepository.findByRoleName("HR");
//            if (existingRole.isEmpty()) {
//                System.out.println("✅ Creating 'HR' Role...");
//                Role superHrRole = new Role();
//                superHrRole.setRoleName("HR"); // **Fixed Role Name**
//                superHrRole.setDescription("Has full access to HR Portal.");
//                roleRepository.save(superHrRole);
//
//                // ✅ Check if department exists
//                Optional<Department> existingDepartment = departmentRepository.findByDName("Human Resources");
//                if (existingDepartment.isEmpty()) {
//                    System.out.println("✅ Creating 'Human Resources' Department...");
//                    Department defaultDepartment = new Department();
//                    defaultDepartment.setDName("Human Resources");
//                    defaultDepartment.setDescription("Manages employee relations, payroll, and benefits.");
//                    departmentRepository.save(defaultDepartment);
//
//                    System.out.println("✅ Creating 'Super HR' Employee...");
//                    Employee superHrEmployee = new Employee();
//                    superHrEmployee.setFirstName("Super");
//                    superHrEmployee.setLastName("HR");
//                    superHrEmployee.setEmail("superhr@hrportal.com");
//                    superHrEmployee.setPhoneNumber("1234567890");
//                    superHrEmployee.setSalary(70000.00);
//                    superHrEmployee.setGender(Employee.Gender.MALE);
//                    superHrEmployee.setAddress("Super HR Address");
//                    superHrEmployee.setHireDate(Date.valueOf("2025-01-01"));
//                    superHrEmployee.setBirthdate(Date.valueOf("1985-01-01"));
//                    superHrEmployee.setStatus(Employee.EmployeeStatus.ACTIVE);
//                    superHrEmployee.setRole(superHrRole);
//                    superHrEmployee.setDepartment(defaultDepartment);
//
//                    // ✅ Save Employee First
//                    employeeRepository.save(superHrEmployee);
//
//                    System.out.println("✅ Creating 'Super HR' User...");
//                    User superHrUser = new User();
//                    superHrUser.setEmail("superhr@hrportal.com");
//                    superHrUser.setPassword(passwordEncoder.encode("superhrpassword"));
//                    superHrUser.setRole(superHrRole);
//                    superHrUser.setEmployee(superHrEmployee);
//
//                    userRepository.save(superHrUser);
//
//                    System.out.println("🚀 Super HR Data Seeded Successfully!");
//                } else {
//                    System.out.println("⚠️ Department 'Human Resources' already exists, skipping seeding.");
//                }
//            } else {
//                System.out.println("⚠️ Role 'HR' already exists, skipping seeding.");
//            }
//        } else {
//            System.out.println("⚠️ Roles already exist, skipping seeding.");
//        }
//    }
//}
