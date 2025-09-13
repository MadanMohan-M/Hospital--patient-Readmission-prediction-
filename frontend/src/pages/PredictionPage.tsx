import React, { useState } from 'react';
import { BarChart3, User, FlaskConical, Activity, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PredictionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_id: '',
    time_in_hospital: '',
    n_procedures: '',
    n_lab_procedures: '',
    n_emergency: '',
    n_outpatient: '',
    n_inpatient: '',
    n_medications: '',
    age: '',
    A1Ctest: '',
    glucose_test: '',
    change: '',
    diabetes_med: '',
    medical_specialty: '',
    diag_1: '',
    diag_2: '',
    diag_3: ''
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.result) setPrediction(data.result);
      else if (data.readmitted !== undefined)
        setPrediction(data.readmitted ? `Readmitted (${data.probability}% chance)` : `Not Readmitted (${data.probability}% chance)`);
      else alert(data.error || 'Prediction failed');
    } catch (err) {
      alert('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setFormData({
      patient_name: '',
      patient_id: '',
      time_in_hospital: '',
      n_procedures: '',
      n_lab_procedures: '',
      n_emergency: '',
      n_outpatient: '',
      n_inpatient: '',
      n_medications: '',
      age: '',
      A1Ctest: '',
      glucose_test: '',
      change: '',
      diabetes_med: '',
      medical_specialty: '',
      diag_1: '',
      diag_2: '',
      diag_3: ''
    });
    setPrediction(null);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10 px-6 bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500 text-black">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <Stethoscope className="w-10 h-10 text-sky-800" />
          <h1 className="text-4xl font-extrabold text-black">Patient Readmission Risk Assessment</h1>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg border border-sky-400 bg-sky-100 text-black hover:bg-sky-200 transition"
            disabled={isLoading}
          >
            ← Back
          </button>
          <button
            onClick={handleRefresh}
            className="px-5 py-2 rounded-lg bg-sky-500 text-black font-semibold hover:bg-sky-400 transition"
            disabled={isLoading}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl border border-sky-100 p-10 space-y-12">

          {/* Patient Demographics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-6 h-6 text-sky-800" />
              <h2 className="text-2xl font-bold text-sky-900">Patient Demographics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                name="patient_name"
                type="text"
                placeholder="Patient Name"
                value={formData.patient_name}
                onChange={handleChange}
                className="input-field"
              />
              <input
                name="patient_id"
                type="text"
                placeholder="Patient ID"
                value={formData.patient_id}
                onChange={handleChange}
                className="input-field"
              />
              <select name="age" value={formData.age} onChange={handleChange} className="input-field">
                <option value="">Select Age Group</option>
                <option>[40-50)</option><option>[50-60)</option>
                <option>[60-70)</option><option>[70-80)</option>
                <option>[80-90)</option><option>[90-100)</option>
              </select>
              <input
                name="time_in_hospital"
                type="number"
                placeholder="Time in Hospital (days)"
                value={formData.time_in_hospital}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          {/* Medical Tests */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="w-6 h-6 text-sky-800" />
              <h2 className="text-2xl font-bold text-sky-900">Medical Tests</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <select name="A1Ctest" value={formData.A1Ctest} onChange={handleChange} className="input-field">
                <option value="">A1C Test Result</option>
                <option>no</option><option>normal</option><option>high</option>
              </select>
              <select name="glucose_test" value={formData.glucose_test} onChange={handleChange} className="input-field">
                <option value="">Glucose Test Result</option>
                <option>no</option><option>normal</option><option>high</option>
              </select>
              <select name="diabetes_med" value={formData.diabetes_med} onChange={handleChange} className="input-field">
                <option value="">Diabetes Medication</option>
                <option>no</option><option>yes</option>
              </select>
            </div>
          </div>

          {/* Visit Statistics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-sky-800" />
              <h2 className="text-2xl font-bold text-sky-900">Visit Statistics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <input name="n_emergency" type="number" placeholder="Emergency Visits" value={formData.n_emergency} onChange={handleChange} className="input-field" />
              <input name="n_outpatient" type="number" placeholder="Outpatient Visits" value={formData.n_outpatient} onChange={handleChange} className="input-field" />
              <input name="n_inpatient" type="number" placeholder="Inpatient Visits" value={formData.n_inpatient} onChange={handleChange} className="input-field" />
              <input name="n_medications" type="number" placeholder="Medications" value={formData.n_medications} onChange={handleChange} className="input-field" />
            </div>
          </div>

          {/* Procedures & Diagnoses */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-sky-800" />
              <h2 className="text-2xl font-bold text-sky-900">Procedures & Diagnoses</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input name="n_procedures" type="number" placeholder="Procedures" value={formData.n_procedures} onChange={handleChange} className="input-field" />
              <input name="n_lab_procedures" type="number" placeholder="Lab Procedures" value={formData.n_lab_procedures} onChange={handleChange} className="input-field" />
              <select name="change" value={formData.change} onChange={handleChange} className="input-field">
                <option value="">Medication Change?</option>
                <option>no</option><option>yes</option>
              </select>
              <select name="medical_specialty" value={formData.medical_specialty} onChange={handleChange} className="input-field">
                <option value="">Medical Specialty</option>
                <option>Missing</option><option>Other</option>
                <option>InternalMedicine</option><option>Family/GeneralPractice</option>
                <option>Cardiology</option><option>Surgery</option><option>Emergency/Trauma</option>
              </select>
              <select name="diag_1" value={formData.diag_1} onChange={handleChange} className="input-field">
                <option value="">Diagnosis 1</option>
                <option>Circulatory</option><option>Other</option><option>Injury</option>
                <option>Digestive</option><option>Respiratory</option><option>Diabetes</option>
                <option>Musculoskeletal</option><option>Missing</option>
              </select>
              <select name="diag_2" value={formData.diag_2} onChange={handleChange} className="input-field">
                <option value="">Diagnosis 2</option>
                <option>Respiratory</option><option>Other</option><option>Circulatory</option>
                <option>Injury</option><option>Diabetes</option><option>Digestive</option>
                <option>Musculoskeletal</option><option>Missing</option>
              </select>
              <select name="diag_3" value={formData.diag_3} onChange={handleChange} className="input-field">
                <option value="">Diagnosis 3</option>
                <option>Other</option><option>Circulatory</option><option>Diabetes</option>
                <option>Respiratory</option><option>Injury</option><option>Musculoskeletal</option>
                <option>Digestive</option><option>Missing</option>
              </select>
            </div>
          </div>

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="w-full mt-6 bg-sky-600 text-black py-4 rounded-xl font-semibold hover:bg-sky-500 shadow-md transition disabled:opacity-50"
          >
            {isLoading ? 'Predicting...' : (
              <span className="flex items-center justify-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Predict</span>
              </span>
            )}
          </button>

          {prediction && (
            <div className="mt-6 p-5 bg-green-50 border border-green-300 text-black rounded-xl text-center text-lg font-semibold shadow-sm">
              Prediction Result: {prediction}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .input-field {
          @apply w-full border border-sky-300 bg-white/70 backdrop-blur-sm text-black
                 p-3 rounded-xl shadow-sm transition focus:outline-none
                 focus:border-sky-500 focus:ring-2 focus:ring-sky-400/50;
        }
      `}</style>
    </div>
  );
};

export default PredictionPage;
