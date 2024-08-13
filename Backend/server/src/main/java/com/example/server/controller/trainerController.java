package com.example.server.controller;

import com.example.server.model.trainerModel;
import com.example.server.service.trainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "http://localhost:3000")
public class trainerController {

    @Autowired
    private trainerService trainerService;

    @GetMapping
    public ResponseEntity<List<trainerModel>> getAllTrainers() {
        List<trainerModel> trainers = trainerService.getAllTrainers();
        return ResponseEntity.ok(trainers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<trainerModel> getTrainerById(@PathVariable Long id) {
        Optional<trainerModel> trainer = trainerService.getTrainerById(id);
        return trainer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<trainerModel> saveTrainer(@RequestBody trainerModel trainer) {
        trainerModel savedTrainer = trainerService.saveTrainer(trainer);
        return ResponseEntity.ok(savedTrainer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<trainerModel> updateTrainer(@PathVariable Long id, @RequestBody trainerModel updatedTrainer) {
        trainerModel trainer = trainerService.updateTrainer(id, updatedTrainer);
        return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long id) {
        trainerService.deleteTrainer(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody trainerModel loginRequest) {
        if (!trainerService.emailExists(loginRequest.getEmail())) {
            return ResponseEntity.status(404).body("Email does not exist");
        }

        trainerModel trainer = trainerService.authenticateTrainer(loginRequest.getEmail(), loginRequest.getPassword());
        if (trainer != null) {
            return ResponseEntity.ok(trainer); // or return a token if using JWT
        } else {
            return ResponseEntity.status(401).body("Invalid password");
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<trainerModel> getTrainerByEmail(@PathVariable String email) {
        trainerModel trainer = trainerService.findTrainerByEmail(email);
        if (trainer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(trainer);
    }

    @DeleteMapping("/email/{email}")
    public ResponseEntity<?> deleteTrainerByEmail(@PathVariable String email) {
        boolean deleted = trainerService.deleteTrainerByEmail(email);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(404).body("Trainer not found");
        }
    }
}
