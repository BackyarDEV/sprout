package com.backyardev.sprout.backend.auth;


public record AuthResponse(
        Long id,
        String username,
        String role,
        String token
) {}