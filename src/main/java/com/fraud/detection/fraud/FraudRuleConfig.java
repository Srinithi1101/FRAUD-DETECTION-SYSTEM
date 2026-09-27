package com.fraud.detection.fraud;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class FraudRuleConfig {

    // Status Thresholds
    public static final int SAFE_MAX_SCORE = 30;
    public static final int SUSPICIOUS_MAX_SCORE = 70;

    // Rule Weight Coefficients
    public static final int HIGH_AMOUNT_WEIGHT = 30;
    public static final int LOCATION_MISMATCH_WEIGHT = 20;
    public static final int FAILED_ATTEMPTS_WEIGHT = 20;
    public static final int HIGH_FREQUENCY_WEIGHT = 15;
    public static final int AMOUNT_SPIKE_WEIGHT = 15;
    public static final int NEW_DEVICE_WEIGHT = 15;
    public static final int COMPOUND_RISK_BONUS = 15;

    // Threshold Values
    public static final BigDecimal HIGH_AMOUNT_THRESHOLD = new BigDecimal("50000");
    public static final BigDecimal EXTREME_AMOUNT_SPIKE_THRESHOLD = new BigDecimal("100000");
    public static final int FAILED_ATTEMPTS_THRESHOLD = 3;
    public static final int HIGH_FREQUENCY_COUNT_THRESHOLD = 10;
}
