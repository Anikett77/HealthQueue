import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { appointmentAPI } from '../../utils/api';
import { Link } from 'react-router-dom';

const MyAppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    // Get patient name from localStorage or prompt
    const storedName = localStorage.getItem('patientName');
    if (storedName) {
      setPatientName(storedName);
      fetchAppointments(storedName);
    } else {
      // For demo purposes, use a default or prompt
      const name = prompt('Please enter your name to view appointments:');
      if (name) {
        localStorage.setItem('patientName', name);
        setPatientName(name);
        fetchAppointments(name);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const fetchAppointments = async (name) => {
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentAPI.getByPatient(name);
      setAppointments(response.appointments || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await appointmentAPI.updateStatus(appointmentId, 'cancelled');
      // Refresh appointments
      if (patientName) {
        fetchAppointments(patientName);
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'bg-gray-500 text-white',
      upcoming: 'bg-health-green text-white',
      cancelled: 'bg-red-500 text-white',
    };
    return badges[status] || badges.upcoming;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <Link to="/patient/book-appointment">
              <Button variant="primary">Book New Appointment</Button>
            </Link>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {appointments.length === 0 ? (
            <Card className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📅</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Appointments Yet</h2>
              <p className="text-gray-600 mb-6">Book your first appointment to get started</p>
              <Link to="/patient/book-appointment">
                <Button variant="primary">Book Appointment</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment._id || appointment.id}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl font-bold text-primary-600">
                              {appointment.token || `T${appointment.queueNumber?.toString().padStart(3, '0')}`}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                                appointment.status || 'pending'
                              )}`}
                            >
                              {(appointment.status || 'pending').charAt(0).toUpperCase() + (appointment.status || 'pending').slice(1)}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {appointment.doctorName || appointment.doctor || 'Doctor'}
                          </h3>
                          <p className="text-gray-600 text-sm">{appointment.department || 'Department'}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Hospital</p>
                          <p className="text-sm font-medium text-gray-900">{appointment.hospital || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Date</p>
                          <p className="text-sm font-medium text-gray-900">{appointment.date || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Time</p>
                          <p className="text-sm font-medium text-gray-900">{appointment.time || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Status</p>
                          <p className="text-sm font-medium text-gray-900 capitalize">{appointment.status || 'pending'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4 flex flex-col gap-2">
                      {(appointment.status === 'pending' || appointment.status === 'waiting') && (
                        <>
                          <Link to={`/patient/queue-status?appointmentId=${appointment._id || appointment.id}`}>
                            <Button variant="primary" className="w-full md:w-auto">
                              Track Queue
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            className="w-full md:w-auto"
                            onClick={() => handleCancel(appointment._id || appointment.id)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <Button variant="secondary" className="w-full md:w-auto" disabled>
                          Completed
                        </Button>
                      )}
                      {appointment.status === 'cancelled' && (
                        <Button variant="secondary" className="w-full md:w-auto" disabled>
                          Cancelled
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyAppointmentsPage;

