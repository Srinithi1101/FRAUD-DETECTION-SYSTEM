package com.fraud.detection.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class TransactionRequest {

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Device ID is required")
    private String deviceId;

    @NotBlank(message = "Transaction type is required")
    private String transactionType;

    @Min(value = 0, message = "Previous transaction count cannot be negative")
    private Integer previousTransactionCount = 0;

    @Min(value = 0, message = "Failed attempts cannot be negative")
    private Integer failedAttempts = 0;

    private Long userId;

    public TransactionRequest() {}

    public TransactionRequest(BigDecimal amount, String location, String deviceId, String transactionType,
                              Integer previousTransactionCount, Integer failedAttempts) {
        this.amount = amount;
        this.location = location;
        this.deviceId = deviceId;
        this.transactionType = transactionType;
        this.previousTransactionCount = previousTransactionCount;
        this.failedAttempts = failedAttempts;
    }

    // Getters and Setters
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
