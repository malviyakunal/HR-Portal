package com.hr.server.model;



import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "payroll")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long payrollId;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    @JsonBackReference
    private Employee employee;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date payrollMonth;

    @Column(nullable = false)
    private double salary;

    @Column
    private double bonus;

    @Column
    private double deductions;

    @Column
    private double totalSalary;
}

