import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { hospitalAPI, departmentAPI, doctorAPI, appointmentAPI } from '../../utils/api';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    hospital: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    patientName: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading hospitals and departments...');
        const [hospitalsRes, departmentsRes] = await Promise.all([
          hospitalAPI.getAll(),
          departmentAPI.getAll()
        ]);
        console.log('Hospitals:', hospitalsRes.hospitals);
        console.log('Departments:', departmentsRes.departments);
        setHospitals(hospitalsRes.hospitals || []);
        setDepartments(departmentsRes.departments || []);
        
        if (!hospitalsRes.hospitals || hospitalsRes.hospitals.length === 0) {
          setError('No hospitals available. Please contact administrator.');
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(`Failed to load data: ${err.message}. Please check if the backend server is running.`);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Load doctors when department is selected
  useEffect(() => {
    const loadDoctors = async () => {
      if (formData.department && departments.length > 0) {
        try {
          const selectedDept = departments.find(d => d.id === parseInt(formData.department));
          if (selectedDept) {
            console.log('Loading doctors for department:', selectedDept.name);
            const doctorsRes = await doctorAPI.getByDepartment(selectedDept.name);
            console.log('Doctors loaded:', doctorsRes.doctors);
            setDoctors(doctorsRes.doctors || []);
          } else {
            console.warn('Department not found:', formData.department);
            setDoctors([]);
          }
        } catch (err) {
          console.error('Error loading doctors:', err);
          setError('Failed to load doctors. Please try again.');
          setDoctors([]);
        }
      } else {
        setDoctors([]);
      }
    };
    loadDoctors();
  }, [formData.department, departments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'department' ? { doctor: '' } : {}),
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const selectedHospital = hospitals.find(h => h.id === parseInt(formData.hospital));
      const selectedDept = departments.find(d => d.id === parseInt(formData.department));
      
      // Find doctor by _id or id (handle both MongoDB _id and regular id)
      // MongoDB _id comes as string in JSON response
      const selectedDoctor = doctors.find(d => {
        const doctorId = d._id ? String(d._id) : (d.id ? String(d.id) : null);
        return doctorId === String(formData.doctor);
      });

      if (!selectedDoctor) {
        console.error('Doctor not found!');
        console.error('Form data doctor value:', formData.doctor, typeof formData.doctor);
        console.error('Available doctors:', doctors.map(d => ({ 
          _id: d._id ? String(d._id) : null, 
          id: d.id ? String(d.id) : null, 
          name: d.name 
        })));
        throw new Error('Please select a doctor');
      }

      const appointmentData = {
        patientName: formData.patientName || 'Anonymous',
        doctorId: selectedDoctor._id || selectedDoctor.id,
        date: formData.date,
        time: formData.time,
        hospital: selectedHospital?.name || selectedDoctor.hospital,
        department: selectedDept?.name || selectedDoctor.department,
      };

      const response = await appointmentAPI.create(appointmentData);
      const appointment = response.data;

      setBookingDetails({
        token: appointment.token,
        waitTime: appointment.predictedWaitingTime,
        ...formData,
        hospitalName: selectedHospital?.name || appointment.hospital,
        departmentName: selectedDept?.name || appointment.department,
        doctorName: selectedDoctor.name || appointment.doctorName,
        appointmentId: appointment._id,
      });
      setShowConfirmation(true);
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = formData.hospital && formData.department && formData.doctor && formData.date && formData.time;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book Appointment</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {!showConfirmation ? (
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Hospital
                  </label>
                  <select
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a hospital</option>
                    {hospitals.map(hospital => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    disabled={!formData.hospital}
                  >
                    <option value="">Choose a department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Doctor
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    disabled={!formData.department}
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map(doctor => {
                      const doctorId = doctor._id ? doctor._id.toString() : (doctor.id ? doctor.id.toString() : '');
                      return (
                        <option key={doctorId} value={doctorId}>
                          {doctor.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    disabled={!formData.doctor}
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    disabled={!formData.date}
                  >
                    <option value="">Choose a time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={!isFormValid || submitting}
                >
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-health-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600">Your appointment has been successfully booked</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Token Number:</span>
                  <span className="text-2xl font-bold text-primary-600">{bookingDetails.token}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hospital:</span>
                  <span className="font-semibold">{bookingDetails.hospitalName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-semibold">{bookingDetails.departmentName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-semibold">{bookingDetails.doctorName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold">{bookingDetails.time}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Wait Time:</span>
                    <span className="text-xl font-bold text-health-green">{bookingDetails.waitTime} minutes</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    if (bookingDetails.appointmentId) {
                      navigate(`/patient/queue-status?appointmentId=${bookingDetails.appointmentId}`);
                    } else {
                      navigate('/patient/queue-status');
                    }
                  }}
                >
                  Track Queue
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => navigate('/patient/appointments')}
                >
                  View Appointments
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookAppointmentPage;

