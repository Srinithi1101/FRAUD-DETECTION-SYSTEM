package com.fraud.detection.repository;

import com.fraud.detection.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByStatusOrderByCreatedAtDesc(String status);

    List<Transaction> findAllByOrderByCreatedAtDesc();

    long countByStatus(String status);

    @Query("SELECT AVG(t.riskScore) FROM Transaction t")
    Double findAverageRiskScore();

    @Query("SELECT t.location, COUNT(t) FROM Transaction t WHERE t.status = 'FRAUD' GROUP BY t.location")
    List<Object[]> findFraudCountByLocation();
}
