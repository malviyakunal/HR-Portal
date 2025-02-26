package com.hr.server.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "l_eave")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Leave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long leaveId;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    @JsonBackReference  // This should be used on the "back" side of the relationship
    private Employee employee;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeaveStatus status;

    @Column(columnDefinition = "TEXT")
    private String reason;

    public enum LeaveStatus {
        APPROVED, PENDING, REJECTED
    }
}
