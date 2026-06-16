package com.backyardev.sprout.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "team", nullable = false, unique = true)
    private String team;
}
