import React, { useEffect, useState } from 'react';

interface Patient {
  id: string;
  patient_name: string;
  patient_id: string;
  age: string;
  medical_specialty: string;
  n_emergency: number;
  n_outpatient: number;
  n_inpatient: number;
  n_medications: number;
  n_procedures: number;
  n_lab_procedures: number;
  time_in_hospital: number;
  A1Ctest: string;
  glucose_test: string;
  change: string;
  diabetes_med: string;
  diag_1: string;
  diag_2: string;
  diag_3: string;
  prediction: boolean;
  probability: number;
}

const PatientsDatabase: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-predictions', { credentials: 'include' })
      .then(res => res.json())
      .then((data: any[]) => {
        const sorted = data
          .map((doc, index) => ({ id: index.toString(), ...doc }))
          .sort((a, b) => b.probability - a.probability);
        setPatients(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching predictions:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-full overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6">Patients Database</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded-xl shadow border-collapse border border-border">
          <thead>
            <tr>
              <th className="px-4 py-2">Patient Name</th>
              <th className="px-4 py-2">Patient ID</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Specialty</th>
              <th className="px-4 py-2">Emergency Visits</th>
              <th className="px-4 py-2">Outpatient Visits</th>
              <th className="px-4 py-2">Inpatient Visits</th>
              <th className="px-4 py-2">Medications</th>
              <th className="px-4 py-2">Procedures</th>
              <th className="px-4 py-2">Lab Procedures</th>
              <th className="px-4 py-2">Time in Hospital</th>
              <th className="px-4 py-2">A1C Test</th>
              <th className="px-4 py-2">Glucose Test</th>
              <th className="px-4 py-2">Change</th>
              <th className="px-4 py-2">Diabetes Med</th>
              <th className="px-4 py-2">Diag 1</th>
              <th className="px-4 py-2">Diag 2</th>
              <th className="px-4 py-2">Diag 3</th>
              <th className="px-4 py-2">Predicted Readmission</th>
              <th className="px-4 py-2">Probability (%)</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-muted/5">
                <td className="border px-4 py-2">{p.patient_name}</td>
                <td className="border px-4 py-2">{p.patient_id}</td>
                <td className="border px-4 py-2">{p.age}</td>
                <td className="border px-4 py-2">{p.medical_specialty}</td>
                <td className="border px-4 py-2">{p.n_emergency}</td>
                <td className="border px-4 py-2">{p.n_outpatient}</td>
                <td className="border px-4 py-2">{p.n_inpatient}</td>
                <td className="border px-4 py-2">{p.n_medications}</td>
                <td className="border px-4 py-2">{p.n_procedures}</td>
                <td className="border px-4 py-2">{p.n_lab_procedures}</td>
                <td className="border px-4 py-2">{p.time_in_hospital}</td>
                <td className="border px-4 py-2">{p.A1Ctest}</td>
                <td className="border px-4 py-2">{p.glucose_test}</td>
                <td className="border px-4 py-2">{p.change}</td>
                <td className="border px-4 py-2">{p.diabetes_med}</td>
                <td className="border px-4 py-2">{p.diag_1}</td>
                <td className="border px-4 py-2">{p.diag_2}</td>
                <td className="border px-4 py-2">{p.diag_3}</td>
                <td className="border px-4 py-2">{p.prediction ? 'Yes' : 'No'}</td>
                <td className="border px-4 py-2">{p.probability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientsDatabase;
