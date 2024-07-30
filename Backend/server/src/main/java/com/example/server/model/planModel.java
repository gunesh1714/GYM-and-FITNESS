package com.example.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class planModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;
    private String planName;
    private Boolean dietPlan;
    private Boolean oneOnOne;
    private Long trainerId;
    private Long userId;

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public Boolean getDietPlan() {
        return dietPlan;
    }

    public void setDietPlan(Boolean dietPlan) {
        this.dietPlan = dietPlan;
    }

    public Boolean getOneOnOne() {
        return oneOnOne;
    }

    public void setOneOnOne(Boolean oneOnOne) {
        this.oneOnOne = oneOnOne;
    }

}
