package com.backyardev.sprout.backend.controller;

import com.backyardev.sprout.backend.entity.Employee;
import com.backyardev.sprout.backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Slf4j
public class EmployeeController {

    private final EmployeeService service;

    @PostMapping
    public Employee create(
            @RequestBody Employee employee)
    {
        log.info("Creating employee: {}", employee.getName());
        return service.save(employee);
    }

    @GetMapping
    public List<Employee> getAll() {
        log.info("Fetching all employees");
        return service.getAll();
    }

    @PutMapping("/{id}")
    public void update(
            @PathVariable Long id,
            @RequestBody Employee employee)
    {
        log.info("Updating employee: {} having id: {}", employee.getName(), id);
        service.update(id, employee);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        log.info("Deleting employee with ID: {}", id);
        service.delete(id);
    }
}