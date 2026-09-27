package com.fraud.detection.dto;

import java.util.Map;

public class DashboardStatsResponse {

    private long totalTransactions;
    private long safeTransactions;
    private long suspiciousTransactions;
    private long fraudTransactions;
    private double fraudPercentage;
    private double averageRiskScore;
    private Map<String, Long> fraudByLocation;

    public DashboardStatsResponse() {}

    public DashboardStatsResponse(long totalTransactions, long safeTransactions, long suspiciousTransactions,
                                  long fraudTransactions, double fraudPercentage, double averageRiskScore,
                                  Map<String, Long> fraudByLocation) {
        this.totalTransactions = totalTransactions;
        this.safeTransactions = safeTransactions;
        this.suspiciousTransactions = suspiciousTransactions;
        this.fraudTransactions = fraudTransactions;
        this.fraudPercentage = fraudPercentage;
        this.averageRiskScore = averageRiskScore;
        this.fraudByLocation = fraudByLocation;
    }

    // Getters and Setters
    public long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public long getSafeTransactions() {
        return safeTransactions;
    }

    public void setSafeTransactions(long safeTransactions) {
        this.safeTransactions = safeTransactions;
    }

    public long getSuspiciousTransactions() {
        return suspiciousTransactions;
    }

    public void setSuspiciousTransactions(long suspiciousTransactions) {
        this.suspiciousTransactions = suspiciousTransactions;
    }

    public long getFraudTransactions() {
        return fraudTransactions;
    }

    public void setFraudTransactions(long fraudTransactions) {
        this.fraudTransactions = fraudTransactions;
    }

    public double getFraudPercentage() {
        return fraudPercentage;
    }

    public void setFraudPercentage(double fraudPercentage) {
        this.fraudPercentage = fraudPercentage;
    }

    public double getAverageRiskScore() {
        return averageRiskScore;
    }

    public void setAverageRiskScore(double averageRiskScore) {
        this.averageRiskScore = averageRiskScore;
    }

    public Map<String, Long> getFraudByLocation() {
        return fraudByLocation;
    }

    public void setFraudByLocation(Map<String, Long> fraudByLocation) {
        this.fraudByLocation = fraudByLocation;
    }
}
