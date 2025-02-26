package com.hr.server.model;



import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long departmentId;

    @Column(name = "DName")
    private String DName;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    
    @OneToMany(mappedBy = "department")
    @JsonManagedReference("department-employee") // Parent side
    private List<Employee> employees;
}
