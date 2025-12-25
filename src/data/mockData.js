// DEPRECATED: This file is no longer used. All data now comes from the backend API.
// Keeping for reference only. Do not import from this file in new code.
// Use src/utils/api.js instead for API calls.

// Mock data for the application

export const hospitals = [
  { id: 1, name: 'City General Hospital' },
  { id: 2, name: 'Central Medical Center' },
  { id: 3, name: 'Regional Health Institute' },
];

export const departments = [
  { id: 1, name: 'Cardiology' },
  { id: 2, name: 'Pediatrics' },
  { id: 3, name: 'Orthopedics' },
  { id: 4, name: 'General Medicine' },
  { id: 5, name: 'Dermatology' },
];

export const doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', department: 'Cardiology', hospital: 1 },
  { id: 2, name: 'Dr. Michael Chen', department: 'Pediatrics', hospital: 1 },
  { id: 3, name: 'Dr. Emily Davis', department: 'Orthopedics', hospital: 1 },
  { id: 4, name: 'Dr. James Wilson', department: 'General Medicine', hospital: 1 },
  { id: 5, name: 'Dr. Lisa Anderson', department: 'Dermatology', hospital: 1 },
  { id: 6, name: 'Dr. Robert Brown', department: 'Cardiology', hospital: 2 },
  { id: 7, name: 'Dr. Maria Garcia', department: 'Pediatrics', hospital: 2 },
];

export const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

export const mockAppointments = [
  {
    id: 1,
    token: 'T001',
    hospital: 'City General Hospital',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'completed',
  },
  {
    id: 2,
    token: 'T045',
    hospital: 'City General Hospital',
    department: 'Pediatrics',
    doctor: 'Dr. Michael Chen',
    date: '2024-01-20',
    time: '02:30 PM',
    status: 'upcoming',
  },
];

export const mockQueueData = {
  currentToken: 'T042',
  myToken: 'T045',
  patientsAhead: 3,
  estimatedWaitTime: 45, // minutes
  queue: [
    { token: 'T042', name: 'Patient A', status: 'current' },
    { token: 'T043', name: 'Patient B', status: 'waiting' },
    { token: 'T044', name: 'Patient C', status: 'waiting' },
    { token: 'T045', name: 'You', status: 'waiting' },
    { token: 'T046', name: 'Patient D', status: 'waiting' },
  ],
};

export const doctorQueueData = {
  currentPatient: {
    token: 'T042',
    name: 'Rajesh Kumar',
    age: 45,
    appointmentTime: '10:00 AM',
  },
  nextPatients: [
    { token: 'T043', name: 'Priya Sharma', age: 32, appointmentTime: '10:30 AM' },
    { token: 'T044', name: 'Amit Patel', age: 28, appointmentTime: '11:00 AM' },
    { token: 'T045', name: 'Sunita Devi', age: 55, appointmentTime: '11:30 AM' },
    { token: 'T046', name: 'Vikram Singh', age: 40, appointmentTime: '12:00 PM' },
    { token: 'T047', name: 'Anita Reddy', age: 35, appointmentTime: '12:30 PM' },
  ],
  stats: {
    avgConsultationTime: 12, // minutes
    totalPatientsToday: 24,
  },
};

export const adminStats = {
  totalPatientsToday: 156,
  averageWaitTime: 28,
  peakHours: '10:00 AM - 12:00 PM',
  departmentLoad: [
    { department: 'Cardiology', patients: 45, load: 85 },
    { department: 'Pediatrics', patients: 38, load: 72 },
    { department: 'Orthopedics', patients: 32, load: 68 },
    { department: 'General Medicine', patients: 28, load: 55 },
    { department: 'Dermatology', patients: 13, load: 42 },
  ],
  doctors: [
    { id: 1, name: 'Dr. Sarah Johnson', department: 'Cardiology', patientsToday: 18, status: 'active' },
    { id: 2, name: 'Dr. Michael Chen', department: 'Pediatrics', patientsToday: 15, status: 'active' },
    { id: 3, name: 'Dr. Emily Davis', department: 'Orthopedics', patientsToday: 12, status: 'active' },
    { id: 4, name: 'Dr. James Wilson', department: 'General Medicine', patientsToday: 10, status: 'active' },
    { id: 5, name: 'Dr. Lisa Anderson', department: 'Dermatology', patientsToday: 8, status: 'active' },
  ],
  settings: {
    emergencyPriority: true,
    seniorCitizenPriority: true,
  },
};

