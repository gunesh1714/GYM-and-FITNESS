package com.example.server.service;

import com.example.server.model.trainerModel;
import com.example.server.repository.trainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class trainerService {

    @Autowired
    private trainerRepository trainerRepository;

    public List<trainerModel> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Optional<trainerModel> getTrainerById(Long id) {
        return trainerRepository.findById(id);
    }

    public trainerModel saveTrainer(trainerModel trainer) {
        return trainerRepository.save(trainer);
    }

    public trainerModel updateTrainer(Long id, trainerModel updatedTrainer) {
        return trainerRepository.findById(id)
                .map(trainer -> {
                    trainer.setName(updatedTrainer.getName());
                    trainer.setEmail(updatedTrainer.getEmail());
                    trainer.setPassword(updatedTrainer.getPassword());
                    trainer.setNumber(updatedTrainer.getNumber());
                    trainer.setRating(updatedTrainer.getRating());
                    return trainerRepository.save(trainer);
                })
                .orElse(null);
    }

    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }

    public trainerModel findTrainerByEmail(String email) {
        return trainerRepository.findByEmail(email);
    }

    public trainerModel authenticateTrainer(String email, String password) {
        trainerModel trainer = trainerRepository.findByEmail(email);
        if (trainer != null && trainer.getPassword().equals(password)) {
            return trainer;
        }
        return null;
    }

    public boolean emailExists(String email) {
        return trainerRepository.findByEmail(email) != null;
    }

    public boolean deleteTrainerByEmail(String email) {
        trainerModel trainer = trainerRepository.findByEmail(email);
        if (trainer != null) {
            trainerRepository.delete(trainer);
            return true;
        }
        return false;
    }
}
