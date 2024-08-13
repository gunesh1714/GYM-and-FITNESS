package com.example.server.controller;

import com.example.server.model.logsModel;
import com.example.server.service.logsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:3000")
public class logsController {

    @Autowired
    private logsService logsService;

    @GetMapping
    public ResponseEntity<List<logsModel>> getAllLogs() {
        List<logsModel> logs = logsService.getAllLogs();
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<logsModel> getLogById(@PathVariable Long id) {
        logsModel log = logsService.getLogById(id);
        if (log != null) {
            return ResponseEntity.ok(log);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<logsModel> saveLog(@RequestBody logsModel log) {
        logsModel savedLog = logsService.saveLog(log);
        return ResponseEntity.ok(savedLog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<logsModel> updateLog(@PathVariable Long id, @RequestBody logsModel updatedLog) {
        logsModel log = logsService.updateLog(id, updatedLog);
        if (log != null) {
            return ResponseEntity.ok(log);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {
        logsService.deleteLog(id);
        return ResponseEntity.noContent().build();
    }
}
