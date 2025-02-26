package com.hr.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_accounts") // Changed from "users" to avoid SQL conflicts
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long uid;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false) // 
    @JsonBackReference("role-user") // Prevents infinite recursion
    private Role role;

    @OneToOne
    @JoinColumn(name = "employee_id", unique = true, nullable = true) // ✅ Nullable for HR users
    @JsonBackReference("employee-user")
    private Employee employee;
}
