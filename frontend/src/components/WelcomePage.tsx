import React from 'react';
import { Stethoscope, Users, BarChart3, Shield, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import medicalHero from '@/assets/medical-hero.jpg';

const WelcomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src={medicalHero} 
            alt="Medical professionals at work"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-12 slide-in">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/20 rounded-3xl mb-6 pulse-glow">
                <Stethoscope className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-6xl font-bold text-card-foreground mb-4">
                MedVision
                <span className="text-primary"> AI</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Advanced Patient Readmission Prediction System for Healthcare Professionals
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                <Activity className="w-12 h-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-card-foreground mb-3">AI Predictions</h3>
                <p className="text-muted-foreground">Advanced machine learning algorithms to predict patient readmission risks</p>
              </div>
              
              <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                <Users className="w-12 h-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-card-foreground mb-3">Patient Management</h3>
                <p className="text-muted-foreground">Comprehensive patient data analysis and risk assessment tools</p>
              </div>
              
              <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                <BarChart3 className="w-12 h-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-card-foreground mb-3">Analytics Dashboard</h3>
                <p className="text-muted-foreground">Real-time insights and detailed reporting for better healthcare decisions</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/login" 
                className="medical-button inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Stethoscope className="w-6 h-6" />
                <span>Doctor Portal</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
              
              <Link 
                to="/dashboard" 
                className="glass-card px-8 py-4 rounded-xl border-2 border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <BarChart3 className="w-6 h-6" />
                <span>View Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-center text-card-foreground mb-12">
              Trusted by Healthcare Professionals
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Prediction Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">250+</div>
                <div className="text-muted-foreground">Healthcare Facilities</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Patients Analyzed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">System Availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Badge */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-8 inline-flex items-center space-x-4">
            <Shield className="w-8 h-8 text-primary" />
            <div className="text-left">
              <div className="font-semibold text-card-foreground">HIPAA Compliant & Secure</div>
              <div className="text-sm text-muted-foreground">Enterprise-grade security for patient data protection</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;