import firebase_admin
from firebase_admin import credentials, firestore
import random

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Sample dummy data
names = ["John", "Sarah", "Michael", "Emily", "David", "Emma", "Daniel", "Olivia", "James", "Sophia",
         "Liam", "Ava", "Noah", "Isabella", "Lucas", "Mia", "Ethan", "Amelia", "Alexander", "Charlotte"]
specialties = ["Cardiology", "Neurology", "Oncology", "Orthopedics", "Pediatrics"]
diags = ["Circulatory", "Respiratory", "Digestive", "Missing"]
test_options = ["no", "normal", "high"]
binary_options = ["no", "yes"]

for i in range(20):
    patient = {
        "patient_id": str(i + 1),
        "patient_name": names[i],
        "age": random.choice(["[40-50)", "[50-60)", "[60-70)", "[70-80)", "[80-90)"]),
        "medical_specialty": random.choice(specialties),
        "n_emergency": random.randint(0, 5),
        "n_outpatient": random.randint(0, 5),
        "n_inpatient": random.randint(0, 5),
        "n_medications": random.randint(1, 20),
        "n_procedures": random.randint(0, 10),
        "n_lab_procedures": random.randint(5, 15),
        "time_in_hospital": random.randint(1, 10),
        "A1Ctest": random.choice(test_options),
        "glucose_test": random.choice(test_options),
        "change": random.choice(binary_options),
        "diabetes_med": random.choice(binary_options),
        "diag_1": random.choice(diags),
        "diag_2": random.choice(diags),
        "diag_3": random.choice(diags),
        "prediction": random.choice([True, False]),
        "probability": round(random.uniform(10, 90), 2)
    }

    # Add to Firestore
    db.collection("predictions").add(patient)
    print(f"Added patient {patient['patient_name']}")

print("20 dummy patients added successfully!")
