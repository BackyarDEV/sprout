package com.backyardev.sprout.backend.auth;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "user_accounts",
        uniqueConstraints = @UniqueConstraint(columnNames = "username")
)
@Getter
@Setter
@NoArgsConstructor
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(name = "password_hash", nullable = false, length = 100)
    private String passwordHash;

    @Column(nullable = false, length = 20)
    private String role = "USER";

    @Column(nullable = false)
    private boolean enabled = true;
}