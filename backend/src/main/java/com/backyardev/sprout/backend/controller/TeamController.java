package com.backyardev.sprout.backend.controller;

import com.backyardev.sprout.backend.entity.Team;
import com.backyardev.sprout.backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
@Slf4j
public class TeamController {

    private final EmployeeService service;

    @GetMapping("")
    public List<Team> getTeams() {
        log.info("Getting teams");
        return service.getTeams();
    }

    @GetMapping("/{team}")
    public Team getTeamByName(@PathVariable String team) {
        log.info("Getting team {}", team);
        return service.getTeamByName(team);
    }

    @PostMapping("")
    public Team addTeam(@RequestBody Team team) {
        log.info("Adding team: {}", team.getTeam());
        return service.addTeam(team);
    }
}
