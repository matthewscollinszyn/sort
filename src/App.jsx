/* =========================================================
   EcoLedger – App Root
   Routes: Public landing + unified Dashboard.
   ========================================================= */

import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import StudentLandingPage from './pages/StudentLandingPage';
import TeacherLandingPage from './pages/TeacherLandingPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminSignIn from './pages/AdminSignIn';
import MRFSignIn from './pages/MRFSignIn';
import MRFStaffDashboard from './pages/MRFStaffDashboard';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public landing – no sidebar / bottom-nav */}
          <Route index element={<LandingPage />} />

          {/* Sign in pages for different user types */}
          <Route path="admin/signin" element={<AdminSignIn />} />
          <Route path="mrf/signin" element={<MRFSignIn />} />

          {/* Student hub – unified landing + dashboard */}
          <Route path="student" element={<StudentLandingPage />} />
          <Route path="student/:tab" element={<StudentLandingPage />} />

          {/* Teacher/Faculty hub – extended reporting (waste, furniture, equipment) */}
          <Route path="teacher" element={<TeacherLandingPage />} />
          <Route path="teacher/:tab" element={<TeacherLandingPage />} />

          {/* Admin dashboard – oversight of all student & teacher reports */}
          <Route path="admin" element={<AdminDashboard />} />

          {/* MRF Staff dashboard – mobile-based waste collection input */}
          <Route path="mrf" element={<MRFStaffDashboard />} />

          {/* Legacy redirect */}
          <Route path="student-home" element={<Navigate to="/student" replace />} />

          {/* Legacy dashboard views inside Layout shell */}
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
