package com.fraud.detection.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class FraudCheckResponse {

    private Long transactionId;
    private BigDecimal amount;
    private String location;
    private String deviceId;
    private String transactionType;
    private String status; // SAFE, SUSPICIOUS, FRAUD
    private Integer riskScore; // 0 - 100
    private List<String> reasons;
    private Boolean alertGenerated;
    private LocalDateTime checkedAt;

    public FraudCheckResponse() {
        this.checkedAt = LocalDateTime.now();
    }

    public FraudCheckResponse(Long transactionId, BigDecimal amount, String location, String deviceId,
                              String transactionType, String status, Integer riskScore,
                              List<String> reasons, Boolean alertGenerated) {
        this();
        this.transactionId = transactionId;
        this.amount = amount;
        this.location = location;
        this.deviceId = deviceId;
        this.transactionType = transactionType;
        this.status = status;
        this.riskScore = riskScore;
        this.reasons = reasons;
        this.alertGenerated = alertGenerated;
    }

    // Getters and Setters
    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }

    public List<String> getReasons() {
        return reasons;
    }

    public void setReasons(List<String> reasons) {
        this.reasons = reasons;
    }

    public Boolean getAlertGenerated() {
        return alertGenerated;
    }

    public void setAlertGenerated(Boolean alertGenerated) {
        this.alertGenerated = alertGenerated;
    }

    public LocalDateTime getCheckedAt() {
        return checkedAt;
    }

    public void setCheckedAt(LocalDateTime checkedAt) {
        this.checkedAt = checkedAt;
    }
}
