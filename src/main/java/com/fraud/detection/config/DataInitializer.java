package com.fraud.detection.config;

import com.fraud.detection.dto.TransactionRequest;
import com.fraud.detection.entity.FraudRule;
import com.fraud.detection.entity.User;
import com.fraud.detection.repository.FraudRuleRepository;
import com.fraud.detection.repository.UserRepository;
import com.fraud.detection.service.TransactionService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final FraudRuleRepository ruleRepository;
    private final TransactionService transactionService;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           FraudRuleRepository ruleRepository,
                           TransactionService transactionService,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.ruleRepository = ruleRepository;
        this.transactionService = transactionService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedRules();
        seedDemoTransactions();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User admin = new User("admin", passwordEncoder.encode("admin123"), "ADMIN", "Chennai", "DEV101");
            User analyst = new User("analyst", passwordEncoder.encode("analyst123"), "ANALYST", "Mumbai", "DEV202");
            userRepository.save(admin);
            userRepository.save(analyst);
        }
    }

    private void seedRules() {
        if (ruleRepository.count() == 0) {
            ruleRepository.save(new FraudRule("RULE_01", "High Amount Rule", "Triggers when transaction amount exceeds ₹50,000", 30, true));
            ruleRepository.save(new FraudRule("RULE_02", "Unusual Location Rule", "Triggers when location differs from user home profile", 20, true));
            ruleRepository.save(new FraudRule("RULE_03", "Failed Attempts Rule", "Triggers when 3 or more failed PIN/password attempts occur", 20, true));
            ruleRepository.save(new FraudRule("RULE_04", "High Frequency Rule", "Triggers when rapid transaction burst is detected", 15, true));
            ruleRepository.save(new FraudRule("RULE_05", "Amount Spike Rule", "Triggers when amount exceeds ₹100,000 baseline", 15, true));
            ruleRepository.save(new FraudRule("RULE_06", "New Device Rule", "Triggers when transaction is initiated from unrecognized device", 15, true));
            ruleRepository.save(new FraudRule("RULE_07", "Compound Pattern Rule", "Adds bonus risk score when 3+ suspicious factors occur together", 15, true));
        }
    }

    private void seedDemoTransactions() {
        if (transactionService.getAllTransactions().isEmpty()) {
            // Demo 1: Normal SAFE Transaction
            TransactionRequest req1 = new TransactionRequest(
                    new BigDecimal("2000"), "Chennai", "DEV101", "UPI", 1, 0
            );
            transactionService.processAndSaveTransaction(req1);

            // Demo 2: Medium/High Amount Transaction (SUSPICIOUS)
            TransactionRequest req2 = new TransactionRequest(
                    new BigDecimal("65000"), "Chennai", "DEV101", "NET_BANKING", 2, 0
            );
            transactionService.processAndSaveTransaction(req2);

            // Demo 3: High Risk FRAUD Transaction
            TransactionRequest req3 = new TransactionRequest(
                    new BigDecimal("90000"), "Mumbai", "NEW_DEVICE", "CARD", 12, 4
            );
            transactionService.processAndSaveTransaction(req3);

            // Demo 4: Another SAFE Transaction
            TransactionRequest req4 = new TransactionRequest(
                    new BigDecimal("4500"), "Chennai", "DEV101", "UPI", 0, 0
            );
            transactionService.processAndSaveTransaction(req4);
        }
    }
}
