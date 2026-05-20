import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { queryClient } from './lib/react-query';
import { AuthProvider } from './features/auth/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Dashboard from './features/dashboard/Dashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LeadsPage } from './pages/leads/LeadsPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="leads" element={<LeadsPage />} />
            </Route>
            
            <Route path="/unauthorized" element={<div className="p-10 text-center">You don't have permission to access this page.</div>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
