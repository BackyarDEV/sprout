package com.backyardev.sprout.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class EmployeeRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role", nullable = false, unique = true)
    private String role;
}
