package com.example.server.repository;

import com.example.server.model.logsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface logsRepository extends JpaRepository<logsModel, Long> {

}
