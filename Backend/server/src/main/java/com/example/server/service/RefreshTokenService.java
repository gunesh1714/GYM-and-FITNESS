package com.example.server.service;

import java.time.Instant;
import java.util.UUID;
import org.springframework.stereotype.Service;
import com.example.server.model.RefreshToken;
import com.example.server.model.User;
import com.example.server.repository.RefreshTokenRepository;
import com.example.server.repository.sampleRepository;

@Service
public class RefreshTokenService {
    private final sampleRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(sampleRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public RefreshToken createRefreshToken(String username) {
        User user = userRepository.findByEmail(username);
        // .orElseThrow(() -> new UsernameNotFoundException("User not found with email :
        // " + username));
        RefreshToken refreshToken = user.getRefreshToken();

        if (refreshToken == null) {
            long refreshTokenValidity = 30 * 24 * 60 * 60 * 1000;
            refreshToken = RefreshToken.builder()
                    .refreshToken(UUID.randomUUID().toString())
                    .expirationTime(Instant.now().plusMillis(refreshTokenValidity))
                    .user(user)
                    .build();

            refreshTokenRepository.save(refreshToken);
        }
        return refreshToken;
    }

    public RefreshToken verifyRefreshToken(String refreshToken) {
        RefreshToken refToken = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found!"));

        if (refToken.getExpirationTime().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(refToken);
            throw new RuntimeException("Refresh Token expired");
        }
        return refToken;
    }
}
