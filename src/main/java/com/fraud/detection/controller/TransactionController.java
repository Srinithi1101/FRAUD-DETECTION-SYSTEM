package com.fraud.detection.controller;

import com.fraud.detection.dto.FraudCheckResponse;
import com.fraud.detection.dto.TransactionRequest;
import com.fraud.detection.entity.Transaction;
import com.fraud.detection.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/check")
    public ResponseEntity<FraudCheckResponse> checkTransaction(@Valid @RequestBody TransactionRequest request) {
        FraudCheckResponse response = transactionService.checkTransaction(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@Valid @RequestBody TransactionRequest request) {
        Transaction transaction = transactionService.processAndSaveTransaction(request);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    @GetMapping("/fraud")
    public ResponseEntity<List<Transaction>> getFraudTransactions() {
        return ResponseEntity.ok(transactionService.getFraudTransactions());
    }

    @GetMapping("/safe")
    public ResponseEntity<List<Transaction>> getSafeTransactions() {
        return ResponseEntity.ok(transactionService.getSafeTransactions());
    }
}
