package com.sjtu.adminanddealer.entity;

import javax.persistence.*;

@Entity
public class StoreTotalScore {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long storeTotalScoreId;

    @JoinColumn(name = "storeId")
    private Long storeId;

    private double totalScore;

    private Long totalJudgeTime;

    public StoreTotalScore() {
    }

    public StoreTotalScore(Long storeId, double totalScore, Long totalJudgeTime) {
        this.storeId = storeId;
        this.totalScore = totalScore;
        this.totalJudgeTime = totalJudgeTime;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public Long getStoreTotalScoreId() {
        return storeTotalScoreId;
    }

    public void setStoreTotalScoreId(Long storeTotalScoreId) {
        this.storeTotalScoreId = storeTotalScoreId;
    }

    public double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(double totalScore) {
        this.totalScore = totalScore;
    }

    public Long getTotalJudgeTime() {
        return totalJudgeTime;
    }

    public void setTotalJudgeTime(Long totalJudgeTime) {
        this.totalJudgeTime = totalJudgeTime;
    }
}
