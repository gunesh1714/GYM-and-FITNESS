package com.example.server.repository;

import com.example.server.model.trainerModel;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface trainerRepository extends JpaRepository<trainerModel, Long> {
    trainerModel findByEmail(String email);
}
