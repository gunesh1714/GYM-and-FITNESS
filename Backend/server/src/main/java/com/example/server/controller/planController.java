package com.example.server.controller;

import com.example.server.model.planModel;
import com.example.server.service.planService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "http://localhost:3000")
public class planController {

    @Autowired
    private planService planService;

    @GetMapping
    public ResponseEntity<List<planModel>> getAllPlans() {
        List<planModel> plans = planService.getAllPlans();
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<planModel> getPlanById(@PathVariable Long id) {
        planModel plan = planService.getPlanById(id);
        if (plan != null) {
            return ResponseEntity.ok(plan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<planModel> savePlan(@RequestBody planModel plan) {
        planModel savedPlan = planService.savePlan(plan);
        return ResponseEntity.ok(savedPlan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<planModel> updatePlan(@PathVariable Long id, @RequestBody planModel updatedPlan) {
        planModel plan = planService.updatePlan(id, updatedPlan);
        if (plan != null) {
            return ResponseEntity.ok(plan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }
}
