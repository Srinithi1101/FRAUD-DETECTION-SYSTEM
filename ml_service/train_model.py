import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
import joblib

def generate_synthetic_data(n_samples=5000):
    np.random.seed(42)
    
    amount = np.random.exponential(scale=15000, size=n_samples)
    failed_attempts = np.random.poisson(lam=0.4, size=n_samples)
    transaction_frequency = np.random.poisson(lam=3, size=n_samples)
    location_change = np.random.choice([0, 1], size=n_samples, p=[0.85, 0.15])
    new_device = np.random.choice([0, 1], size=n_samples, p=[0.90, 0.10])
    previous_transaction_count = np.random.randint(0, 50, size=n_samples)
    
    # Synthetic fraud label decision rule with noise
    risk_score = (
        (amount > 50000) * 30 +
        (location_change == 1) * 20 +
        (failed_attempts >= 3) * 25 +
        (new_device == 1) * 15 +
        (transaction_frequency > 10) * 15 +
        np.random.normal(0, 5, size=n_samples)
    )
    
    fraud_label = (risk_score > 60).astype(int)
    
    df = pd.DataFrame({
        'amount': amount,
        'failed_attempts': failed_attempts,
        'transaction_frequency': transaction_frequency,
        'location_change': location_change,
        'new_device': new_device,
        'previous_transaction_count': previous_transaction_count,
        'fraud': fraud_label
    })
    
    return df

def train_and_save():
    print("Generating synthetic financial transaction dataset...")
    df = generate_synthetic_data(5000)
    
    X = df.drop('fraud', axis=1)
    y = df['fraud']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Classifier model...")
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    
    preds = clf.predict(X_test)
    probs = clf.predict_proba(X_test)[:, 1]
    
    print("\nModel Performance Evaluation:")
    print(classification_report(y_test, preds))
    print(f"ROC-AUC Score: {roc_auc_score(y_test, probs):.4f}")
    
    joblib.dump(clf, 'fraud_model.pkl')
    print("\nSuccessfully saved trained model to 'fraud_model.pkl'.")

if __name__ == '__main__':
    train_and_save()
