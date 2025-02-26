package com.hr.server.service;

import com.hr.server.model.Department;
import com.hr.server.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(long id) {
        return departmentRepository.findById(id);
    }

    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(long id, Department updatedDepartment) {
        return departmentRepository.findById(id).map(dept -> {
            dept.setDName(updatedDepartment.getDName());
            dept.setDescription(updatedDepartment.getDescription());
            return departmentRepository.save(dept);
        }).orElseThrow(() -> new RuntimeException("Department not found"));
    }

    public void deleteDepartment(long id) {
        departmentRepository.deleteById(id);
    }
}
