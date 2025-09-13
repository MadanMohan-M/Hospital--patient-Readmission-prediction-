// src/pages/Reports.tsx
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface Patient {
  patient_name: string;
  readmitted: boolean;
  probability: number;
  risk: 'Low' | 'Medium' | 'High';
}

const Reports: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-predictions', { credentials: 'include' })
      .then(res => res.json())
      .then((data: any[]) => {
        // Map backend data to Patient type
        const mapped: Patient[] = data.map(p => ({
        patient_name: p.patient_name,
        readmitted: p.prediction,
        probability: p.probability,
        risk: p.probability > 70 ? 'High' : p.probability > 40 ? 'Medium' : 'Low'
        }));

        setPatients(mapped);

        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching patients:', err);
        setLoading(false);
      });
  }, []);

  // Aggregate data for charts
  const riskCounts = patients.reduce(
    (acc, patient) => {
      acc[patient.risk] = (acc[patient.risk] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const riskData = [
    { name: 'Low Risk', value: riskCounts['Low'] || 0 },
    { name: 'Medium Risk', value: riskCounts['Medium'] || 0 },
    { name: 'High Risk', value: riskCounts['High'] || 0 },
  ];

  const COLORS = ['#34D399', '#FBBF24', '#EF4444'];

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6 space-x-4">
        <Link to="/dashboard" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20">
          <ArrowLeft className="w-5 h-5 text-primary" />
        </Link>
        <h1 className="text-3xl font-bold text-card-foreground">Patient Reports</h1>
      </div>

      {/* Risk Distribution Pie Chart */}
      <div className="glass-card p-6 rounded-2xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Risk Distribution</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={riskData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {riskData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Readmission Probabilities Table */}
      <div className="glass-card p-6 rounded-2xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Patient Readmission Probabilities</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Patient Name</th>
                <th className="px-4 py-2">Readmitted</th>
                <th className="px-4 py-2">Probability (%)</th>
                <th className="px-4 py-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{p.patient_name}</td>
                  <td className="border px-4 py-2">{p.readmitted ? 'Yes' : 'No'}</td>
                  <td className="border px-4 py-2">{p.probability}</td>
                  <td className={`border px-4 py-2 ${p.risk === 'High' ? 'text-red-500' : p.risk === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                    {p.risk}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Probability Bar Chart */}
      <div className="glass-card p-6 rounded-2xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Probability Distribution</h2>
        <BarChart width={600} height={300} data={patients}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="patient_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="probability" fill="#3B82F6" />
        </BarChart>
      </div>
    </div>
  );
};

export default Reports;
