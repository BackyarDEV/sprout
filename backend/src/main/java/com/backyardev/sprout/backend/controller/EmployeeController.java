package com.backyardev.sprout.backend.controller;

import com.backyardev.sprout.backend.entity.Employee;
import com.backyardev.sprout.backend.entity.Skill;
import com.backyardev.sprout.backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Slf4j
public class EmployeeController {

    private final EmployeeService service;

    @PostMapping
    public Employee create(
            @RequestBody Employee employee
    ) {
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
            @RequestBody Employee employee
    ) {
        log.info("Updating employee: {} having id: {}", employee.getName(), id);
        service.update(id, employee);
    }

    @PutMapping("/{id}/skills")
    public Employee updateSkills(
            @PathVariable Long id,
            @RequestBody Set<Skill> skills
    ) {
        log.info("Updating skills for employee with id: {}", id);
        return service.updateSkills(id, skills);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        log.info("Deleting employee with ID: {}", id);
        service.delete(id);
    }
}
