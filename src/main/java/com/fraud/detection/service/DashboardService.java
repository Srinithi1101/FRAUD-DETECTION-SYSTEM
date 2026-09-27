package com.fraud.detection.service;

import com.fraud.detection.dto.DashboardStatsResponse;
import com.fraud.detection.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;

    public DashboardService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public DashboardStatsResponse getDashboardStats() {
        long totalTransactions = transactionRepository.count();
        long safeTransactions = transactionRepository.countByStatus("SAFE");
        long suspiciousTransactions = transactionRepository.countByStatus("SUSPICIOUS");
        long fraudTransactions = transactionRepository.countByStatus("FRAUD");

        double fraudPercentage = totalTransactions > 0 ? ((double) fraudTransactions / totalTransactions) * 100 : 0.0;
        Double avgRisk = transactionRepository.findAverageRiskScore();
        double averageRiskScore = avgRisk != null ? Math.round(avgRisk * 100.0) / 100.0 : 0.0;

        List<Object[]> locationData = transactionRepository.findFraudCountByLocation();
        Map<String, Long> fraudByLocation = new HashMap<>();
        for (Object[] row : locationData) {
            String location = (String) row[0];
            Long count = (Long) row[1];
            fraudByLocation.put(location, count);
        }

        return new DashboardStatsResponse(
                totalTransactions,
                safeTransactions,
                suspiciousTransactions,
                fraudTransactions,
                Math.round(fraudPercentage * 100.0) / 100.0,
                averageRiskScore,
                fraudByLocation
        );
    }
}
