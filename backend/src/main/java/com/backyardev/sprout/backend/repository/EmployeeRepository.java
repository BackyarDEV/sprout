package com.backyardev.sprout.backend.repository;

import com.backyardev.sprout.backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findAllByRoleId(Long roleId);
}
