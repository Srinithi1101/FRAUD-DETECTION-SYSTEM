package com.fraud.detection.service;

import com.fraud.detection.dto.FraudCheckResponse;
import com.fraud.detection.dto.TransactionRequest;
import com.fraud.detection.entity.Transaction;
import com.fraud.detection.exception.ResourceNotFoundException;
import com.fraud.detection.fraud.FraudDetectionEngine;
import com.fraud.detection.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final FraudDetectionEngine fraudDetectionEngine;
    private final AlertService alertService;

    public TransactionService(TransactionRepository transactionRepository,
                              FraudDetectionEngine fraudDetectionEngine,
                              AlertService alertService) {
        this.transactionRepository = transactionRepository;
        this.fraudDetectionEngine = fraudDetectionEngine;
        this.alertService = alertService;
    }

    public FraudCheckResponse checkTransaction(TransactionRequest request) {
        return fraudDetectionEngine.evaluate(request);
    }

    @Transactional
    public Transaction processAndSaveTransaction(TransactionRequest request) {
        // Run fraud analysis
        FraudCheckResponse response = fraudDetectionEngine.evaluate(request);

        // Convert to entity
        Transaction transaction = new Transaction();
        transaction.setAmount(request.getAmount());
        transaction.setLocation(request.getLocation());
        transaction.setDeviceId(request.getDeviceId());
        transaction.setTransactionType(request.getTransactionType());
        transaction.setPreviousTransactionCount(request.getPreviousTransactionCount());
        transaction.setFailedAttempts(request.getFailedAttempts());
        transaction.setUserId(request.getUserId());
        transaction.setStatus(response.getStatus());
        transaction.setRiskScore(response.getRiskScore());
        transaction.setFraudReason(String.join("; ", response.getReasons()));
        transaction.setTransactionTime(LocalDateTime.now());

        Transaction savedTransaction = transactionRepository.save(transaction);

        // Auto-generate Fraud Alert if classified as FRAUD
        if ("FRAUD".equalsIgnoreCase(savedTransaction.getStatus())) {
            alertService.createAlert(savedTransaction);
        }

        return savedTransaction;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByCreatedAtDesc();
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with ID: " + id));
    }

    public List<Transaction> getFraudTransactions() {
        return transactionRepository.findByStatusOrderByCreatedAtDesc("FRAUD");
    }

    public List<Transaction> getSafeTransactions() {
        return transactionRepository.findByStatusOrderByCreatedAtDesc("SAFE");
    }
}
