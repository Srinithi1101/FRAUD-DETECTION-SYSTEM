package com.fraud.detection.fraud;

import com.fraud.detection.dto.FraudCheckResponse;
import com.fraud.detection.dto.TransactionRequest;
import com.fraud.detection.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

public class FraudDetectionEngineTest {

    private FraudDetectionEngine engine;
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        userRepository = Mockito.mock(UserRepository.class);
        RiskScoreCalculator calculator = new RiskScoreCalculator();
        engine = new FraudDetectionEngine(calculator, userRepository);
    }

    @Test
    public void testSafeTransaction() {
        TransactionRequest req = new TransactionRequest(
                new BigDecimal("2000"), "Chennai", "DEV101", "UPI", 1, 0
        );

        FraudCheckResponse response = engine.evaluate(req);
        assertEquals("SAFE", response.getStatus());
        assertTrue(response.getRiskScore() <= 30);
        assertFalse(response.getAlertGenerated());
    }

    @Test
    public void testHighAmountTransaction() {
        TransactionRequest req = new TransactionRequest(
                new BigDecimal("65000"), "Chennai", "DEV101", "UPI", 1, 0
        );

        FraudCheckResponse response = engine.evaluate(req);
        assertTrue(response.getRiskScore() >= 30);
        assertTrue(response.getReasons().stream().anyMatch(r -> r.contains("High transaction amount")));
    }

    @Test
    public void testFraudTransaction_CombinedConditions() {
        TransactionRequest req = new TransactionRequest(
                new BigDecimal("90000"), "Mumbai", "NEW_DEVICE", "CARD", 12, 4
        );

        FraudCheckResponse response = engine.evaluate(req);
        assertEquals("FRAUD", response.getStatus());
        assertTrue(response.getRiskScore() > 70);
        assertTrue(response.getAlertGenerated());
        assertTrue(response.getReasons().size() >= 3);
    }
}
