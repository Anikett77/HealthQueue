// API utility file for making backend requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function for making API requests
const apiRequest = async (endpoint, options = {}) => {
  try {
    // Get token from localStorage for authenticated requests
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If response is not JSON, try to get text
        try {
          const text = await response.text();
          if (text) errorMessage = text;
        } catch (e2) {
          // Keep default error message
        }
      }
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', {
      endpoint: `${API_BASE_URL}${endpoint}`,
      error: error.message,
      status: error.status
    });
    throw error;
  }
};

// Appointment APIs
export const appointmentAPI = {
  // Create a new appointment
  create: async (appointmentData) => {
    return apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  // Get appointments for a specific doctor
  getByDoctor: async (doctorId) => {
    return apiRequest(`/appointments/${doctorId}`);
  },

  // Get appointments for a patient (by patient name or ID)
  getByPatient: async (patientName) => {
    return apiRequest(`/appointments/patient/${patientName}`);
  },

  // Get all appointments
  getAll: async () => {
    return apiRequest('/appointments');
  },

  // Get appointment by ID
  getById: async (appointmentId) => {
    return apiRequest(`/appointments/id/${appointmentId}`);
  },

  // Update appointment status
  updateStatus: async (appointmentId, status) => {
    return apiRequest(`/appointments/${appointmentId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// Queue APIs
export const queueAPI = {
  // Get queue status for a patient
  getPatientQueueStatus: async (appointmentId) => {
    return apiRequest(`/queue/patient/${appointmentId}`);
  },

  // Get queue for a doctor
  getDoctorQueue: async (doctorId) => {
    return apiRequest(`/queue/doctor/${doctorId}`);
  },

  // Get current queue position
  getCurrentPosition: async (appointmentId) => {
    return apiRequest(`/queue/position/${appointmentId}`);
  },
};

// Doctor APIs
export const doctorAPI = {
  // Get all doctors
  getAll: async () => {
    return apiRequest('/doctors');
  },

  // Get doctor by ID
  getById: async (doctorId) => {
    return apiRequest(`/doctors/${doctorId}`);
  },

  // Get doctors by department
  getByDepartment: async (department) => {
    return apiRequest(`/doctors/department/${department}`);
  },
};

// Department APIs
export const departmentAPI = {
  // Get all departments
  getAll: async () => {
    return apiRequest('/departments');
  },
};

// Hospital APIs
export const hospitalAPI = {
  // Get all hospitals
  getAll: async () => {
    return apiRequest('/hospitals');
  },
};

// Admin APIs
export const adminAPI = {
  // Get admin dashboard stats
  getStats: async () => {
    return apiRequest('/admin/stats');
  },

  // Get department load
  getDepartmentLoad: async () => {
    return apiRequest('/admin/department-load');
  },
};

// Auth APIs
export const authAPI = {
  // Register new user
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Get current user
  getMe: async () => {
    const token = localStorage.getItem('token');
    return apiRequest('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
};

// AI APIs
export const aiAPI = {
  // Get prediction
  predict: async (data) => {
    return apiRequest('/ai/predict', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

