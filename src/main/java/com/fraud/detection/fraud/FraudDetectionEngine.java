package com.fraud.detection.fraud;

import com.fraud.detection.dto.FraudCheckResponse;
import com.fraud.detection.dto.TransactionRequest;
import com.fraud.detection.entity.User;
import com.fraud.detection.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FraudDetectionEngine {

    private final RiskScoreCalculator riskScoreCalculator;
    private final UserRepository userRepository;

    public FraudDetectionEngine(RiskScoreCalculator riskScoreCalculator, UserRepository userRepository) {
        this.riskScoreCalculator = riskScoreCalculator;
        this.userRepository = userRepository;
    }

    public FraudCheckResponse evaluate(TransactionRequest request) {
        int calculatedRiskScore = 0;
        List<String> reasons = new ArrayList<>();
        int rulesTriggeredCount = 0;

        // Fetch User profile if available for baseline comparison
        Optional<User> userOpt = Optional.empty();
        if (request.getUserId() != null) {
            userOpt = userRepository.findById(request.getUserId());
        }

        // RULE 1: High Transaction Amount (> 50,000)
        if (request.getAmount() != null && request.getAmount().compareTo(FraudRuleConfig.HIGH_AMOUNT_THRESHOLD) > 0) {
            calculatedRiskScore += FraudRuleConfig.HIGH_AMOUNT_WEIGHT;
            reasons.add("High transaction amount (Exceeds ₹" + FraudRuleConfig.HIGH_AMOUNT_THRESHOLD + ")");
            rulesTriggeredCount++;
        }

        // RULE 2: Unusual Location (Different from user's registered home location)
        String userNormalLocation = userOpt.map(User::getNormalLocation).orElse(null);
        if (userNormalLocation != null && !userNormalLocation.equalsIgnoreCase(request.getLocation())) {
            calculatedRiskScore += FraudRuleConfig.LOCATION_MISMATCH_WEIGHT;
            reasons.add("Unknown or different location from user baseline (" + request.getLocation() + ")");
            rulesTriggeredCount++;
        } else if (userNormalLocation == null && request.getLocation() != null && isUnusualLocation(request.getLocation())) {
            calculatedRiskScore += FraudRuleConfig.LOCATION_MISMATCH_WEIGHT;
            reasons.add("Transaction location flagged as high-risk zone (" + request.getLocation() + ")");
            rulesTriggeredCount++;
        }

        // RULE 3: Multiple Failed Authorization Attempts (>= 3)
        if (request.getFailedAttempts() != null && request.getFailedAttempts() >= FraudRuleConfig.FAILED_ATTEMPTS_THRESHOLD) {
            calculatedRiskScore += FraudRuleConfig.FAILED_ATTEMPTS_WEIGHT;
            reasons.add("Multiple failed authentication attempts (" + request.getFailedAttempts() + " attempts)");
            rulesTriggeredCount++;
        }

        // RULE 4: Unusually High Frequency
        if (request.getPreviousTransactionCount() != null && request.getPreviousTransactionCount() >= FraudRuleConfig.HIGH_FREQUENCY_COUNT_THRESHOLD) {
            calculatedRiskScore += FraudRuleConfig.HIGH_FREQUENCY_WEIGHT;
            reasons.add("Unusually high transaction frequency (" + request.getPreviousTransactionCount() + " recent transactions)");
            rulesTriggeredCount++;
        }

        // RULE 5: Amount Spike (Unusually high vs baseline threshold ₹100,000)
        if (request.getAmount() != null && request.getAmount().compareTo(FraudRuleConfig.EXTREME_AMOUNT_SPIKE_THRESHOLD) >= 0) {
            calculatedRiskScore += FraudRuleConfig.AMOUNT_SPIKE_WEIGHT;
            reasons.add("Extreme transaction amount spike detected");
            rulesTriggeredCount++;
        }

        // RULE 6: New or Unrecognized Device
        String userPrimaryDevice = userOpt.map(User::getPrimaryDeviceId).orElse(null);
        if (userPrimaryDevice != null && !userPrimaryDevice.equalsIgnoreCase(request.getDeviceId())) {
            calculatedRiskScore += FraudRuleConfig.NEW_DEVICE_WEIGHT;
            reasons.add("Unrecognized or new device ID (" + request.getDeviceId() + ")");
            rulesTriggeredCount++;
        } else if (request.getDeviceId() != null && (request.getDeviceId().toUpperCase().contains("NEW") || request.getDeviceId().toUpperCase().contains("UNKNOWN"))) {
            calculatedRiskScore += FraudRuleConfig.NEW_DEVICE_WEIGHT;
            reasons.add("New or untrusted device ID used");
            rulesTriggeredCount++;
        }

        // RULE 7: Compound Risk Bonus (Multiple suspicious factors occurring together)
        if (rulesTriggeredCount >= 3) {
            calculatedRiskScore += FraudRuleConfig.COMPOUND_RISK_BONUS;
            reasons.add("Multiple compound suspicious conditions detected together");
        }

        // Cap score between 0 and 100
        int finalRiskScore = riskScoreCalculator.capScore(calculatedRiskScore);

        // Classify Status: SAFE, SUSPICIOUS, or FRAUD
        String status = riskScoreCalculator.classifyRiskScore(finalRiskScore);

        if (reasons.isEmpty()) {
            reasons.add("Transaction behaviour is normal");
        }

        boolean alertGenerated = "FRAUD".equals(status);

        FraudCheckResponse response = new FraudCheckResponse();
        response.setAmount(request.getAmount());
        response.setLocation(request.getLocation());
        response.setDeviceId(request.getDeviceId());
        response.setTransactionType(request.getTransactionType());
        response.setRiskScore(finalRiskScore);
        response.setStatus(status);
        response.setReasons(reasons);
        response.setAlertGenerated(alertGenerated);

        return response;
    }

    private boolean isUnusualLocation(String location) {
        // High-risk remote locations or simulated unknown zones
        List<String> suspiciousZones = List.of("UNKNOWN", "FOREIGN_IP", "OFFSHORE", "TUSCON", "ROVANIEMI");
        return suspiciousZones.stream().anyMatch(zone -> zone.equalsIgnoreCase(location));
    }
}
