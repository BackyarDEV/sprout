package com.backyardev.sprout.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne()
    @JoinTable(
            name = "employee_role_links",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "role_id"})
    )
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private EmployeeRole role;

    private String team;

    @ManyToMany(
        cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
        },
        fetch = FetchType.LAZY
    )
    @JoinTable(
        name = "employee_skill_links",
        joinColumns = @JoinColumn(name = "employee_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id"),
        uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "skill_id"})
    )
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<Skill> skills = new LinkedHashSet<>();
}
