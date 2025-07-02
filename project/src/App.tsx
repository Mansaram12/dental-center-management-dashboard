import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { initializeData } from './utils/mockData';

// Components
import Login from './components/Auth/Login';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import PatientDashboard from './components/Dashboard/PatientDashboard';

function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                {/* Admin Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Patient Routes */}
                <Route path="/patient-dashboard" element={
                  <ProtectedRoute allowedRoles={['Patient']}>
                    <PatientDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Placeholder routes for other components */}
                <Route path="/patients" element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <div className="p-6"><h1 className="text-2xl font-bold">Patients Management - Coming Soon</h1></div>
                  </ProtectedRoute>
                } />
                
                <Route path="/appointments" element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <div className="p-6"><h1 className="text-2xl font-bold">Appointments - Coming Soon</h1></div>
                  </ProtectedRoute>
                } />
                
                <Route path="/incidents" element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <div className="p-6"><h1 className="text-2xl font-bold">Incidents Management - Coming Soon</h1></div>
                  </ProtectedRoute>
                } />
                
                <Route path="/calendar" element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <div className="p-6"><h1 className="text-2xl font-bold">Calendar View - Coming Soon</h1></div>
                  </ProtectedRoute>
                } />
                
                <Route path="/my-appointments" element={
                  <ProtectedRoute allowedRoles={['Patient']}>
                    <div className="p-6"><h1 className="text-2xl font-bold">My Appointments - Coming Soon</h1></div>
                  </ProtectedRoute>
                } />
                
                <Route path="/my-profile" element={
                  <ProtectedRoute allowedRoles={['Patient']}>
                    <div className="p-6"><h1 className="text-2xl font-bold">My Profile - Coming Soon</h1></div>
                  </ProtectedRoute>
                } />
                
                <Route index element={<Navigate to="/login" replace />} />
              </Route>
              
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;