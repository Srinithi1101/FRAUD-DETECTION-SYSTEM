package com.fraud.detection.repository;

import com.fraud.detection.entity.FraudAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<FraudAlert, Long> {
    List<FraudAlert> findAllByOrderByAlertTimeDesc();
    List<FraudAlert> findByResolvedFalseOrderByAlertTimeDesc();
}
