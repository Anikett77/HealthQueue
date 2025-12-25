import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import { adminAPI } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [departmentLoad, setDepartmentLoad] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    emergencyPriority: true,
    seniorCitizenPriority: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [statsRes, deptLoadRes, doctorsRes] = await Promise.all([
          adminAPI.getStats(),
          adminAPI.getDepartmentLoad(),
          adminAPI.getDoctors(),
        ]);
        setStats(statsRes);
        setDepartmentLoad(deptLoadRes.departmentLoad || []);
        setDoctors(doctorsRes.doctors || []);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError(err.message || 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    // TODO: Save settings to backend
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <Card className="text-center py-12">
              <p className="text-red-600">{error || 'Failed to load admin data'}</p>
            </Card>
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-2">Total Patients Today</p>
                  <p className="text-4xl font-bold text-primary-600">{stats.totalPatientsToday || 0}</p>
                </div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👥</span>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-2">Average Wait Time</p>
                  <p className="text-4xl font-bold text-health-green">{stats.averageWaitTime || 0} min</p>
                </div>
                <div className="w-16 h-16 bg-health-lightGreen rounded-full flex items-center justify-center">
                  <span className="text-3xl">⏱️</span>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-2">Peak Hours</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.peakHours || 'N/A'}</p>
                </div>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📈</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Department Load Chart */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Department-wise Load</h2>
              <div className="space-y-4">
                {departmentLoad.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No department data available</p>
                ) : (
                  departmentLoad.map((dept) => (
                  <div key={dept.department}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-900">{dept.department}</span>
                      <span className="text-sm text-gray-600">{dept.patients} patients</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          dept.load >= 80
                            ? 'bg-red-500'
                            : dept.load >= 60
                            ? 'bg-yellow-500'
                            : 'bg-health-green'
                        }`}
                        style={{ width: `${dept.load}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{dept.load}% capacity</p>
                  </div>
                  ))
                )}
              </div>
            </Card>

            {/* Settings */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Queue Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Emergency Priority</p>
                    <p className="text-sm text-gray-600">Prioritize emergency cases</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emergencyPriority}
                      onChange={() => toggleSetting('emergencyPriority')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-health-green"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Senior Citizen Priority</p>
                    <p className="text-sm text-gray-600">Prioritize senior citizens</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.seniorCitizenPriority}
                      onChange={() => toggleSetting('seniorCitizenPriority')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-health-green"></div>
                  </label>
                </div>
              </div>
            </Card>
          </div>

          {/* Doctor Management Table */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Doctor Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Doctor Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patients Today</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        No doctors found
                      </td>
                    </tr>
                  ) : (
                    doctors.map((doctor) => (
                      <tr key={doctor.id || doctor._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{doctor.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{doctor.department}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{doctor.patientsToday || 0}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              doctor.status === 'active'
                                ? 'bg-health-green text-white'
                                : 'bg-gray-400 text-white'
                            }`}
                          >
                            {doctor.status || 'active'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

