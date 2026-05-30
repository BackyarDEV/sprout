package com.backyardev.sprout.backend.service;

import com.backyardev.sprout.backend.entity.Employee;
import com.backyardev.sprout.backend.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository repository;

    public List<Employee> getAll() {
        return repository.findAll();
    }

    public Employee save(Employee employee) {
        return repository.save(employee);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void update(Long id, Employee employee) {
        var existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        existing.setName(employee.getName());
        existing.setRole(employee.getRole());
        repository.save(existing);
    }
}