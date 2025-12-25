import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isPatientRoute = location.pathname.startsWith('/patient');
  const isDoctorRoute = location.pathname.startsWith('/doctor');
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">H</span>
            </div>
            <span className="text-xl font-bold text-gray-800">HealthQueue</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isPatientRoute && (
              <>
                <Link
                  to="/patient/book-appointment"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Book Appointment
                </Link>
                <Link
                  to="/patient/queue-status"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Queue Status
                </Link>
                <Link
                  to="/patient/appointments"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Appointments
                </Link>
              </>
            )}
            {isDoctorRoute && (
              <Link
                to="/doctor/dashboard"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
            {isAdminRoute && (
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin Dashboard
              </Link>
            )}
            <Link
              to="/patient/login"
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

