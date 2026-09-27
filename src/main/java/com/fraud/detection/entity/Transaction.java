package com.fraud.detection.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String location;

    @Column(name = "device_id", nullable = false)
    private String deviceId;

    @Column(name = "transaction_type", nullable = false)
    private String transactionType;

    @Column(name = "transaction_time")
    private LocalDateTime transactionTime;

    @Column(name = "previous_transaction_count")
    private Integer previousTransactionCount = 0;

    @Column(name = "failed_attempts")
    private Integer failedAttempts = 0;

    @Column(nullable = false)
    private String status; // SAFE, SUSPICIOUS, FRAUD

    @Column(name = "risk_score", nullable = false)
    private Integer riskScore;

    @Column(name = "fraud_reason", length = 1000)
    private String fraudReason;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Transaction() {
        this.createdAt = LocalDateTime.now();
        if (this.transactionTime == null) {
            this.transactionTime = LocalDateTime.now();
        }
    }

    public Transaction(BigDecimal amount, String location, String deviceId, String transactionType,
                       Integer previousTransactionCount, Integer failedAttempts) {
        this();
        this.amount = amount;
        this.location = location;
        this.deviceId = deviceId;
        this.transactionType = transactionType;
        this.previousTransactionCount = previousTransactionCount != null ? previousTransactionCount : 0;
        this.failedAttempts = failedAttempts != null ? failedAttempts : 0;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(LocalDateTime transactionTime) {
        this.transactionTime = transactionTime;
    }

    public Integer getPreviousTransactionCount() {
        return previousTransactionCount;
    }

    public void setPreviousTransactionCount(Integer previousTransactionCount) {
        this.previousTransactionCount = previousTransactionCount;
    }

    public Integer getFailedAttempts() {
        return failedAttempts;
    }

    public void setFailedAttempts(Integer failedAttempts) {
        this.failedAttempts = failedAttempts;
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

    public String getFraudReason() {
        return fraudReason;
    }

    public void setFraudReason(String fraudReason) {
        this.fraudReason = fraudReason;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
