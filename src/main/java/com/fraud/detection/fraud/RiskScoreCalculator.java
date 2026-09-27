package com.fraud.detection.fraud;

import org.springframework.stereotype.Component;

@Component
public class RiskScoreCalculator {

    public String classifyRiskScore(int riskScore) {
        if (riskScore <= FraudRuleConfig.SAFE_MAX_SCORE) {
            return "SAFE";
        } else if (riskScore <= FraudRuleConfig.SUSPICIOUS_MAX_SCORE) {
            return "SUSPICIOUS";
        } else {
            return "FRAUD";
        }
    }

    public int capScore(int score) {
        return Math.min(100, Math.max(0, score));
    }
}
