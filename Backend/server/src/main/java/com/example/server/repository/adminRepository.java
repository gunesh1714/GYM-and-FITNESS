package com.example.server.repository;

import com.example.server.model.adminModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface adminRepository extends JpaRepository<adminModel, Long> {
    adminModel findByEmail(String email);
}
