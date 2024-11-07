import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Exchange from './pages/Exchange';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import Verification from './pages/Verification';
import VerificationResult from './pages/VerificationResult';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardExchange from './pages/dashboard/Exchange';
import Referrals from './pages/dashboard/Referrals';
import Settings from './pages/dashboard/Settings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sparkles from './components/Sparkles';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect to verification if user is unverified
  if (user?.status === 'unverified' && 
      !window.location.pathname.startsWith('/verification')) {
    return <Navigate to="/verification" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(70,206,157,0.03)_0%,rgba(235,84,188,0.03)_100%)]"></div>
        <Sparkles />
        
        <div className="relative">
          <Routes>
            <Route path="/" element={<><Navbar /><Exchange /><Footer /></>} />
            <Route path="/help" element={<><Navbar /><Help /><Footer /></>} />
            <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
            <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
            <Route path="/verification" element={<PrivateRoute><Verification /></PrivateRoute>} />
            <Route path="/verification/result" element={<PrivateRoute><VerificationResult /></PrivateRoute>} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route index element={<Navigate to="/dashboard/exchange" replace />} />
              <Route path="exchange" element={<DashboardExchange />} />
              <Route path="referrals" element={<Referrals />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;