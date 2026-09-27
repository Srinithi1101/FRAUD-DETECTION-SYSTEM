package com.fraud.detection.service;

import com.fraud.detection.entity.FraudAlert;
import com.fraud.detection.entity.Transaction;
import com.fraud.detection.repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    private final AlertRepository alertRepository;

    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public FraudAlert createAlert(Transaction transaction) {
        FraudAlert alert = new FraudAlert(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getLocation(),
                transaction.getStatus(),
                transaction.getRiskScore(),
                transaction.getFraudReason()
        );
        return alertRepository.save(alert);
    }

    public List<FraudAlert> getAllAlerts() {
        return alertRepository.findAllByOrderByAlertTimeDesc();
    }

    public List<FraudAlert> getActiveAlerts() {
        return alertRepository.findByResolvedFalseOrderByAlertTimeDesc();
    }
}
