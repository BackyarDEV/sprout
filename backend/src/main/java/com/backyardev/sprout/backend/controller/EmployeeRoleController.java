package com.backyardev.sprout.backend.controller;

import com.backyardev.sprout.backend.entity.EmployeeRole;
import com.backyardev.sprout.backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@Slf4j
public class EmployeeRoleController {

    private final EmployeeService service;

    @GetMapping("")
    public List<EmployeeRole> getRoles() {
        return service.getRoles();
    }

    @GetMapping("/{role}")
    public EmployeeRole getRoleByName(@PathVariable String role) {
        return service.getRoleByName(role);
    }

    @PostMapping("")
    public EmployeeRole addRole(@RequestBody EmployeeRole role) {
        return service.addRole(role);
    }
}
