import React from 'react';
import { BarChart3, Users, Activity, TrendingUp, Bell, Settings, LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const recentPredictions = [
    { id: '001', patient: 'John Smith', risk: 'High', probability: '87%', date: '2024-01-15' },
    { id: '002', patient: 'Sarah Johnson', risk: 'Low', probability: '23%', date: '2024-01-15' },
    { id: '003', patient: 'Michael Brown', risk: 'Medium', probability: '65%', date: '2024-01-14' },
    { id: '004', patient: 'Emily Davis', risk: 'Low', probability: '18%', date: '2024-01-14' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Medical Dashboard</h1>
              <p className="text-muted-foreground">Patient Readmission Analytics & Predictions</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Bell className="w-5 h-5 text-primary" />
              </button>
              <button className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Settings className="w-5 h-5 text-primary" />
              </button>
              <Link to="/login" className="p-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-colors">
                <LogOut className="w-5 h-5 text-destructive" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Patients */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">1,247</div>
            <div className="text-sm text-muted-foreground">Total Patients</div>
          </div>

          {/* Accuracy */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">98.5%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>

          {/* High Risk Cases */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-yellow-500/20">
                <BarChart3 className="w-6 h-6 text-yellow-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">156</div>
            <div className="text-sm text-muted-foreground">High Risk Cases</div>
          </div>

          {/* Readmissions This Week */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-500/20">
                <Activity className="w-6 h-6 text-red-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">23</div>
            <div className="text-sm text-muted-foreground">Readmissions This Week</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Predictions */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-card-foreground">Recent Predictions</h2>
                <Link 
                  to="/prediction"
                  className="inline-flex items-center space-x-2 medical-button px-4 py-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Prediction</span>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentPredictions.map((prediction) => (
                  <div key={prediction.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/5 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium text-card-foreground">{prediction.patient}</div>
                      <div className="text-sm text-muted-foreground">ID: {prediction.id}</div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium text-card-foreground">{prediction.probability}</div>
                        <div className="text-sm text-muted-foreground">{prediction.date}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-lg border text-sm font-medium ${getRiskColor(prediction.risk)}`}>
                        {prediction.risk} Risk
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/prediction"
                  className="w-full p-4 rounded-xl border border-border hover:bg-primary/5 hover:border-primary/20 transition-colors flex items-center space-x-3"
                >
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="text-card-foreground">New Patient Analysis</span>
                </Link>
                
                <Link
      to="/reports"
      className="w-full p-4 rounded-xl border border-border hover:bg-primary/5 hover:border-primary/20 transition-colors flex items-center space-x-3"
    >
      <BarChart3 className="w-5 h-5 text-primary" />
      <span className="text-card-foreground">View Reports</span>
    </Link>
    
                
                {/* ✅ Fixed Link */}
                <Link
                  to="/patients"
                  className="w-full p-4 rounded-xl border border-border hover:bg-primary/5 hover:border-primary/20 transition-colors flex items-center space-x-3"
                >
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-card-foreground">Patient Database</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
