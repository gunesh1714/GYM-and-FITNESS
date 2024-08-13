package com.example.server.service;

import com.example.server.model.planModel;
import com.example.server.repository.planRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class planService {

    @Autowired
    private planRepository planRepository;

    public List<planModel> getAllPlans() {
        return planRepository.findAll();
    }

    public planModel getPlanById(Long id) {
        return planRepository.findById(id).orElse(null);
    }

    public planModel savePlan(planModel plan) {
        return planRepository.save(plan);
    }

    public planModel updatePlan(Long id, planModel updatedPlan) {
        return planRepository.findById(id)
                .map(plan -> {
                    plan.setPlanName(updatedPlan.getPlanName());
                    plan.setDietPlan(updatedPlan.getDietPlan());
                    plan.setOneOnOne(updatedPlan.getOneOnOne());
                    plan.setCalorieIntake(updatedPlan.getCalorieIntake());
                    plan.setProtienIntake(updatedPlan.getProtienIntake());
                    plan.setCarbsIntake(updatedPlan.getCarbsIntake());
                    plan.setDailyTarget(updatedPlan.getDailyTarget());
                    plan.setDailyTargetAchieved(updatedPlan.getDailyTargetAchieved());
                    plan.setMonthlyTarget(updatedPlan.getMonthlyTarget());
                    plan.setMonthlyTargetAchieved(updatedPlan.getMonthlyTargetAchieved());
                    plan.setWeeklyTarget(updatedPlan.getWeeklyTarget());
                    plan.setWeeklyTargetAchieved(updatedPlan.getWeeklyTargetAchieved());
                    return planRepository.save(plan);
                })
                .orElse(null);
    }

    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }
}
