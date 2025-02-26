package com.hr.server.controller;

import com.hr.server.model.Department;
import com.hr.server.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("/{id}") // ✅ Corrected {Did} → {id}
    public Optional<Department> getDepartmentById(@PathVariable long id) {
        return departmentService.getDepartmentById(id);
    }

    @PostMapping
    public Department createDepartment(@RequestBody Department department) {
        return departmentService.saveDepartment(department);
    }

    @PutMapping("/{id}") // ✅ Corrected {Did} → {id}
    public Department updateDepartment(@PathVariable long id, @RequestBody Department department) {
        return departmentService.updateDepartment(id, department);
    }

    @DeleteMapping("/{id}") // ✅ Corrected {Did} → {id}
    public String deleteDepartment(@PathVariable long id) {
        departmentService.deleteDepartment(id);
        return "Department deleted successfully!";
    }
}
