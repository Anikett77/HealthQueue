import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Patient Pages
import LandingPage from './pages/patient/LandingPage';
import LoginPage from './pages/patient/LoginPage';
import RegisterPage from './pages/patient/RegisterPage';
import BookAppointmentPage from './pages/patient/BookAppointmentPage';
import QueueStatusPage from './pages/patient/QueueStatusPage';
import MyAppointmentsPage from './pages/patient/MyAppointmentsPage';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Patient Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patient/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/patient/queue-status" element={<QueueStatusPage />} />
        <Route path="/patient/appointments" element={<MyAppointmentsPage />} />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

