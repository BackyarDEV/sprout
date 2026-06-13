package com.backyardev.sprout.backend.service;

import com.backyardev.sprout.backend.entity.Employee;
import com.backyardev.sprout.backend.entity.EmployeeRole;
import com.backyardev.sprout.backend.entity.Skill;
import com.backyardev.sprout.backend.repository.EmployeeRepository;
import com.backyardev.sprout.backend.repository.EmployeeRoleRepository;
import com.backyardev.sprout.backend.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final SkillRepository skillRepository;
    private final EmployeeRoleRepository employeeRoleRepository;

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Employee save(Employee employee) {
        employee.setSkills(resolveSkills(employee.getSkills()));
        return employeeRepository.save(employee);
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    public void update(Long id, Employee employee) {
        var existing = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        existing.setName(employee.getName());
        existing.setRole(employee.getRole());
        existing.setTeam(employee.getTeam());
        employeeRepository.save(existing);
    }

    public Employee updateSkills(Long id, Set<Skill> requestedSkills) {
        var existing = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        existing.setSkills(resolveSkills(requestedSkills));
        return employeeRepository.save(existing);
    }

    private Set<Skill> resolveSkills(Set<Skill> requestedSkills) {
        if (requestedSkills == null) {
            return new LinkedHashSet<>();
        }

        var resolvedSkills = new LinkedHashSet<Skill>();
        var seen = new LinkedHashSet<String>();

        for (Skill requestedSkill : requestedSkills) {
            if (requestedSkill == null || requestedSkill.getSkillName() == null) {
                continue;
            }

            var normalizedName = requestedSkill.getSkillName().trim();
            if (normalizedName.isEmpty()) {
                continue;
            }

            var lookupKey = normalizedName.toLowerCase();
            if (!seen.add(lookupKey)) {
                continue;
            }

            var skill = skillRepository.findBySkillNameIgnoreCase(normalizedName)
                .orElseGet(() -> {
                    var createdSkill = new Skill();
                    createdSkill.setSkillName(normalizedName);
                    return skillRepository.save(createdSkill);
                });

            resolvedSkills.add(skill);
        }

        return resolvedSkills;
    }

    public List<EmployeeRole> getRoles() {
        return employeeRoleRepository.findAll();
    }

    public EmployeeRole getRoleByName(String role) {
        return employeeRoleRepository.findByRoleIgnoreCase(role)
            .orElseThrow(() -> new RuntimeException("Role not found: " + role));
    }

    public EmployeeRole addRole(EmployeeRole role) {
        return employeeRoleRepository.save(role);
    }
}
