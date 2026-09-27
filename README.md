# Real-Time Financial Fraud Detection System Using Java & Spring Boot

A complete, production-ready, rule-based & machine-learning-enhanced **Real-Time Financial Fraud Detection System** built for college final-year project demonstrations, research, and viva evaluations.

---

## 📌 Project Overview & Problem Statement

Financial institutions process millions of electronic transactions daily (via UPI, Cards, Net Banking, and Wire Transfers). With the surge in digital banking, fraudulent transactions have increased exponentially. Traditional batch-processing security systems fail to stop fraud before funds are disbursed. 

This project solves this problem by providing a **real-time fraud detection engine** that evaluates financial transactions instantly, calculates a **Risk Score (0 to 100)**, categorizes transactions into **SAFE**, **SUSPICIOUS**, or **FRAUD**, and generates clear audit reasons alongside real-time browser alerts.

---

## ⚙ Technology Stack

### Backend
* **Language:** Java 17
* **Framework:** Spring Boot 3.2.3
* **Web:** Spring MVC (REST APIs)
* **ORM & Database:** Spring Data JPA / Hibernate
* **Security:** Spring Security (BCrypt Password Hashing, CORS, Role-based Access)
* **Build Tool:** Apache Maven

### Database
* **Database Engine:** MySQL 8.0+
* **Database Name:** `fraud_detection`
* **Schema Strategy:** Automatic Hibernate DDL (`spring.jpa.hibernate.ddl-auto=update`)

### Frontend
* **Framework:** React 18 (Vite)
* **Styling:** Custom Cybersecurity Glassmorphism CSS
* **Icons:** Lucide React
* **Charts:** Recharts (Dynamic status distribution & location metrics)

### Optional Machine Learning Module
* **Python 3.10+**
* **Scikit-learn (Random Forest Classifier)**
* **Flask REST Service**

---

## 🏗 Application Architecture

```
                       ┌─────────────────────────┐
                       │  React 18 Frontend UI   │
                       │  (Vite + Recharts)      │
                       └────────────┬────────────┘
                                    │ REST APIs (JSON)
                                    ▼
                       ┌─────────────────────────┐
                       │ Spring Boot REST Controllers│
                       │ (Transaction, Dashboard, Alert)│
                       └────────────┬────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │  Transaction Service    │
                       └────────────┬────────────┘
                                    │
                                    ▼
               ┌──────────────────────────────────────────┐
               │         Fraud Detection Engine           │
               ├──────────────────────────────────────────┤
               │ 1. High Amount Rule (> ₹50,000)          │
               │ 2. Location Mismatch Rule                │
               │ 3. Failed Auth Attempts (>= 3)           │
               │ 4. Unusually High Frequency              │
               │ 5. Transaction Amount Spike              │
               │ 6. New / Unrecognized Device ID          │
               │ 7. Compound Risk Bonus                   │
               └────────────────────┬─────────────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │  Risk Score Calculator   │
                       │  (Score 0-100: SAFE/    │
                       │   SUSPICIOUS/FRAUD)      │
                       └────────────┬────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │ MySQL Database Storage  │
                       │ (users, transactions,   │
                       │  fraud_rules, alerts)   │
                       └─────────────────────────┘
```

---

## 🧮 Fraud Detection Logic & Risk Scoring System

The system evaluates incoming transactions against **7 configurable rule vectors**. Points are accumulated into a composite **Risk Score (0 - 100)**:

| Rule Code | Rule Description | Weight | Trigger Condition |
| :--- | :--- | :--- | :--- |
| **RULE_01** | High Transaction Amount | **+30** | Amount > ₹50,000 |
| **RULE_02** | Unusual Location | **+20** | Location differs from user's registered home baseline |
| **RULE_03** | Multiple Failed Attempts | **+20** | Failed authorization attempts ≥ 3 |
| **RULE_04** | High Frequency Burst | **+15** | Recent transaction count ≥ 10 |
| **RULE_05** | Extreme Amount Spike | **+15** | Amount ≥ ₹100,000 |
| **RULE_06** | New / Unrecognized Device | **+15** | Device ID differs from baseline or contains "NEW"/"UNKNOWN" |
| **RULE_07** | Compound Risk Pattern | **+15** | 3 or more rules triggered simultaneously |

### Classification Thresholds

```
   0 ──────────────── 30 ──────────────── 70 ──────────────── 100
   │      SAFE        │    SUSPICIOUS    │       FRAUD        │
   └──────────────────┴──────────────────┴────────────────────┘
```

* **0 – 30:** **SAFE** (Normal behavior, green indicator)
* **31 – 70:** **SUSPICIOUS** (Requires analyst monitoring, amber indicator)
* **71 – 100:** **FRAUD** (Flagged immediately, red alert banner & browser alert)

---

## 🗄 Database Schema Structure

The application automatically creates 4 MySQL tables upon startup:

1. `users` (id, username, password, role, normal_location, primary_device_id, created_at)
2. `transactions` (id, amount, location, device_id, transaction_type, transaction_time, previous_transaction_count, failed_attempts, status, risk_score, fraud_reason, created_at)
3. `fraud_rules` (id, rule_code, rule_name, description, weight, enabled, created_at)
4. `fraud_alerts` (id, transaction_id, amount, location, status, risk_score, reason, alert_time, resolved)

---

## 🚀 How to Set Up and Run the Application

### Prerequisites
1. **Java 17 JDK** installed
2. **MySQL 8.0+** server running locally on port `3306`
3. **Node.js 18+** and `npm` installed

---

### Step 1: Database Setup
Start your MySQL server and create the database schema:
```sql
CREATE DATABASE IF NOT EXISTS fraud_detection;
```

---

### Step 2: Configure Database Password
Open [`src/main/resources/application.properties`](file:///c:/Users/srini/OneDrive/Desktop/FRAUD%20DETECTION%20SYSTEM/src/main/resources/application.properties) and update your MySQL password:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```
*(Or export an environment variable `DB_PASSWORD=YOUR_MYSQL_PASSWORD`)*

---

### Step 3: Run Spring Boot Backend
Open a terminal in the root directory and run:
```bash
# Using Maven (or via IntelliJ / Eclipse)
mvn spring-boot:run
```
The backend server will start at: `http://localhost:8080`

Default seeded login credentials:
* **Admin Role:** Username: `admin` | Password: `admin123`
* **Analyst Role:** Username: `analyst` | Password: `analyst123`

---

### Step 4: Run React Frontend
Open a new terminal in the `frontend/` folder:
```bash
cd frontend
npm install
npm run dev
```
Open your browser and navigate to: `http://localhost:5173`

---

### Step 5 (Optional): Run Python Machine Learning Service
```bash
cd ml_service
pip install -r requirements.txt
python train_model.py
python app.py
```
ML API will run at `http://localhost:5000`

---

## 📡 REST API Reference

### 1. Check Transaction for Fraud
* **Endpoint:** `POST /api/transactions/check`
* **Request Body:**
```json
{
  "amount": 75000,
  "location": "Chennai",
  "deviceId": "DEV101",
  "transactionType": "UPI",
  "previousTransactionCount": 2,
  "failedAttempts": 0
}
```
* **Response Body:**
```json
{
  "amount": 75000,
  "location": "Chennai",
  "deviceId": "DEV101",
  "transactionType": "UPI",
  "status": "SUSPICIOUS",
  "riskScore": 30,
  "reasons": [
    "High transaction amount (Exceeds ₹50000)"
  ],
  "alertGenerated": false,
  "checkedAt": "2026-09-27T18:45:00"
}
```

### 2. Process & Save Transaction
* **Endpoint:** `POST /api/transactions`

### 3. Get All Transactions
* **Endpoint:** `GET /api/transactions`

### 4. Get Dashboard Statistics
* **Endpoint:** `GET /api/dashboard/stats`
* **Response:**
```json
{
  "totalTransactions": 4,
  "safeTransactions": 2,
  "suspiciousTransactions": 1,
  "fraudTransactions": 1,
  "fraudPercentage": 25.0,
  "averageRiskScore": 35.5,
  "fraudByLocation": {
    "Mumbai": 1
  }
}
```

### 5. Get Fraud Alerts
* **Endpoint:** `GET /api/alerts`

---

## 🎓 Viva Questions & Answers Guide

**Q1: Why use a Rule Engine over Machine Learning initially?**
> *Answer:* Rule engines are deterministic, transparent, and evaluate in sub-milliseconds without requiring historical training datasets. Financial compliance requires explainability (reasons for blocking a card). ML is added as an auxiliary scoring layer.

**Q2: How is the Risk Score calculated?**
> *Answer:* The `FraudDetectionEngine` evaluates incoming transaction parameters against predefined `FraudRule` definitions. If a condition is met, its weight is added to a cumulative score, which is capped between 0 and 100.

**Q3: How is password security implemented?**
> *Answer:* Passwords are never stored in plain text. We use Spring Security's `BCryptPasswordEncoder`, which uses salted key derivation.

---

## 📜 License & Author
Developed as a complete Final Year Computer Science Project Demonstration.
