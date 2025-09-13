import os
from flask import Flask, request, jsonify, session
import joblib
import numpy as np
import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore
from flask_cors import CORS

# ---------------- Initialize Flask ----------------
app = Flask(__name__)
app.secret_key = "supersecretkey"
CORS(app, supports_credentials=True)

# ---------------- Firestore Setup ----------------
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()  # Firestore DB reference

# ---------------- Dummy Doctor Login ----------------
DOCTOR_USER = "doctor"
DOCTOR_PASS = "password123"

# ---------------- Load ML model ----------------
model = joblib.load('rf_model2.pkl')
train_cols = np.load('train_columns.npy', allow_pickle=True)

# ---------------- Preprocessing mappings ----------------
age_map = {'[40-50)':45,'[50-60)':55,'[60-70)':65,'[70-80)':75,'[80-90)':85,'[90-100)':95}
test_map = {'no':0,'normal':1,'high':2}
binary_map = {'no':0,'yes':1}

log_cols = ['n_emergency', 'n_outpatient', 'n_medications']
nominal_cols = ['medical_specialty', 'diag_1', 'diag_2', 'diag_3']

# ---------------- Preprocessing function ----------------
def preprocess_input(input_dict: dict) -> pd.DataFrame:
    df = pd.DataFrame([input_dict])
    for col in log_cols:
        df[f'{col}_log'] = np.log1p(df[col])
        df.drop(columns=[col], inplace=True)
    df['age_encoded'] = df['age'].map(age_map)
    df['A1Ctest_encoded'] = df['A1Ctest'].map(test_map)
    df['glucose_test_encoded'] = df['glucose_test'].map(test_map)
    df['change_encoded'] = df['change'].map(binary_map)
    df['diabetes_med_encoded'] = df['diabetes_med'].map(binary_map)
    df = pd.get_dummies(df, columns=nominal_cols, drop_first=True)
    df.drop(columns=['age','A1Ctest','glucose_test','change','diabetes_med'], inplace=True)
    for col in train_cols:
        if col not in df.columns:
            df[col] = 0
    return df[train_cols]

# ---------------- Auth routes ----------------
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    if data.get('username') == DOCTOR_USER and data.get('password') == DOCTOR_PASS:
        session['doctor_logged_in'] = True
        return jsonify({"success": True})
    return jsonify({"success": False, "error": "Invalid username or password"}), 401

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    return jsonify({"authenticated": bool(session.get('doctor_logged_in', False))})

@app.route('/api/logout', methods=['POST'])
def api_logout():
    session.clear()
    return jsonify({"success": True})

# ---------------- Prediction route ----------------
@app.route('/api/predict', methods=['POST'])
def api_predict():
    if not session.get('doctor_logged_in'):
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    try:
        # Must include patient_name and patient_id
        patient_name = data.get('patient_name', 'Unknown')
        patient_id = data.get('patient_id', 'Unknown')

        input_dict = {
            'n_emergency': float(data['n_emergency']),
            'n_outpatient': float(data['n_outpatient']),
            'n_inpatient': float(data['n_inpatient']),
            'n_medications': float(data['n_medications']),
            'time_in_hospital': float(data['time_in_hospital']),
            'n_procedures': float(data['n_procedures']),
            'n_lab_procedures': float(data['n_lab_procedures']),
            'age': data['age'],
            'A1Ctest': data['A1Ctest'],
            'glucose_test': data['glucose_test'],
            'change': data['change'],
            'diabetes_med': data['diabetes_med'],
            'medical_specialty': data['medical_specialty'],
            'diag_1': data['diag_1'],
            'diag_2': data['diag_2'],
            'diag_3': data['diag_3'],
        }

        X = preprocess_input(input_dict)
        pred = model.predict(X)[0]
        proba = round(model.predict_proba(X)[0][1] * 100, 2)

        # Save to Firestore
        record = {**input_dict, "prediction": bool(pred), "probability": proba,
                  "patient_name": patient_name, "patient_id": patient_id}
        db.collection("predictions").add(record)

        return jsonify({
            "readmitted": bool(pred),
            "probability": proba
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ---------------- Get all predictions ----------------
@app.route('/api/get-predictions', methods=['GET'])
def get_predictions():
    if not session.get('doctor_logged_in'):
        return jsonify({"error": "Unauthorized"}), 401
    try:
        docs = db.collection('predictions').stream()
        results = [doc.to_dict() for doc in docs]
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ---------------- Run App ----------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
