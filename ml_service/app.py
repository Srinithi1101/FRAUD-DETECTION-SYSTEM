from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os

app = Flask(__name__)

MODEL_PATH = 'fraud_model.pkl'
model = None

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print("Random Forest model loaded successfully.")

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not trained yet. Run train_model.py first.'}), 500
    
    data = request.get_json()
    
    # Feature extraction
    features = pd.DataFrame([{
        'amount': data.get('amount', 0),
        'failed_attempts': data.get('failed_attempts', 0),
        'transaction_frequency': data.get('transaction_frequency', 0),
        'location_change': data.get('location_change', 0),
        'new_device': data.get('new_device', 0),
        'previous_transaction_count': data.get('previous_transaction_count', 0)
    }])
    
    fraud_prob = float(model.predict_proba(features)[0][1])
    is_fraud = bool(fraud_prob > 0.5)
    
    return jsonify({
        'fraud_probability': round(fraud_prob, 4),
        'is_fraud_predicted': is_fraud,
        'model_used': 'RandomForestClassifier'
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
