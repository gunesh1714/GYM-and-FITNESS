package com.example.server.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class planModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;
    private String planName;
    private Boolean dietPlan;
    private Boolean oneOnOne;
    private Integer CalorieIntake;
    private Integer ProtienIntake;
    private Integer CarbsIntake;
    private Float dailyTarget;
    private Float dailyTargetAchieved;
    private Float monthlyTarget;
    private Float monthlyTargetAchieved;
    private Float weeklyTarget;
    private Float weeklyTargetAchieved;

    @OneToOne(mappedBy = "plan", cascade = CascadeType.ALL)
    private userModel user;

    public Long getPlanId() {
        return planId;
    }

    public Float getDailyTarget() {
        return dailyTarget;
    }

    public void setDailyTarget(Float dailyTarget) {
        this.dailyTarget = dailyTarget;
    }

    public Float getDailyTargetAchieved() {
        return dailyTargetAchieved;
    }

    public void setDailyTargetAchieved(Float dailyTargetAchieved) {
        this.dailyTargetAchieved = dailyTargetAchieved;
    }

    public Float getMonthlyTarget() {
        return monthlyTarget;
    }

    public void setMonthlyTarget(Float monthlyTarget) {
        this.monthlyTarget = monthlyTarget;
    }

    public Float getMonthlyTargetAchieved() {
        return monthlyTargetAchieved;
    }

    public void setMonthlyTargetAchieved(Float monthlyTargetAchieved) {
        this.monthlyTargetAchieved = monthlyTargetAchieved;
    }

    public Float getWeeklyTarget() {
        return weeklyTarget;
    }

    public void setWeeklyTarget(Float weeklyTarget) {
        this.weeklyTarget = weeklyTarget;
    }

    public Float getWeeklyTargetAchieved() {
        return weeklyTargetAchieved;
    }

    public void setWeeklyTargetAchieved(Float weeklyTargetAchieved) {
        this.weeklyTargetAchieved = weeklyTargetAchieved;
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

    public Integer getCalorieIntake() {
        return CalorieIntake;
    }

    public void setCalorieIntake(Integer calorieIntake) {
        CalorieIntake = calorieIntake;
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

    public Integer getProtienIntake() {
        return ProtienIntake;
    }

    public void setProtienIntake(Integer protienIntake) {
        ProtienIntake = protienIntake;
    }

    public Integer getCarbsIntake() {
        return CarbsIntake;
    }

    public void setCarbsIntake(Integer carbsIntake) {
        CarbsIntake = carbsIntake;
    }

}
