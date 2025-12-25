const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">HealthQueue</h3>
            <p className="text-gray-400 text-sm">
              Digital Patient Queue & Appointment Management System for Government Hospitals
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Book Appointment</a></li>
              <li><a href="#" className="hover:text-white">Track Queue</a></li>
              <li><a href="#" className="hover:text-white">My Appointments</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Emergency: 108<br />
              Helpline: 1800-XXX-XXXX<br />
              Email: support@healthqueue.gov.in
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 HealthQueue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

