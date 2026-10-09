package com.backyardev.sprout.backend.service;

import com.backyardev.sprout.backend.auth.AuthResponse;
import com.backyardev.sprout.backend.auth.LoginRequest;
import com.backyardev.sprout.backend.auth.RegisterRequest;
import com.backyardev.sprout.backend.auth.UserAccount;
import com.backyardev.sprout.backend.repository.UserAccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class AuthService {

    private final UserAccountRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;

    public AuthService(
            UserAccountRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtEncoder jwtEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtEncoder = jwtEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new org.springframework.web.server.ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Username is already taken"
            );
        }

        var account = new UserAccount();
        account.setUsername(request.username());
        account.setPasswordHash(passwordEncoder.encode(request.password()));
        account.setRole("USER");
        account.setEnabled(true);

        UserAccount saved = userRepository.save(account);

        return new AuthResponse(
                saved.getId(),
                saved.getUsername(),
                saved.getRole(),
                null
        );
    }


    public AuthResponse login(LoginRequest request) {
        UserAccount user = userRepository.findByUsername(request.username())
                .filter(UserAccount::isEnabled)
                .filter(account -> passwordEncoder.matches(
                        request.password(), account.getPasswordHash()))
                .orElseThrow(() ->
                        new BadCredentialsException("Invalid username or password"));

        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("sprout")
                .subject(user.getUsername())
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .claim("role", user.getRole())
                .build();

        String token = jwtEncoder.encode(
                JwtEncoderParameters.from(
                        org.springframework.security.oauth2.jwt.JwsHeader
                                .with(MacAlgorithm.HS256).build(),
                        claims
                )
        ).getTokenValue();

        return new AuthResponse(
                user.getId(),
                user.getUsername(),
                user.getRole(),
                token
        );
    }
}