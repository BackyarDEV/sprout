package com.backyardev.sprout.backend.repository;

import com.backyardev.sprout.backend.entity.EmployeeRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRoleRepository extends JpaRepository<EmployeeRole, Long> {

    Optional<EmployeeRole> findByRoleIgnoreCase(String role);
}
