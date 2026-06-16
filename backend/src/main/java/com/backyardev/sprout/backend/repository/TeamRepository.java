package com.backyardev.sprout.backend.repository;

import com.backyardev.sprout.backend.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {

    Optional<Team> findByTeamIgnoreCase(String team);
}
