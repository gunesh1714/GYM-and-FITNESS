package com.example.server.repository;

import com.example.server.model.userModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<userModel, Long> {
    Optional<userModel> findByEmail(String email);
}
