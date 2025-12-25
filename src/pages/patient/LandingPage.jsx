import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-health-lightBlue py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Digital Queue System for Government Hospitals
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Skip the long waits. Book appointments, track your queue status, and manage your healthcare visits seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/patient/book-appointment">
              <Button variant="primary" className="w-full sm:w-auto">
                Book Appointment
              </Button>
            </Link>
            <Link to="/patient/queue-status">
              <Button variant="outline" className="w-full sm:w-auto">
                Track Queue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Wait Time</h3>
                <p className="text-gray-600">
                  Get accurate estimated wait times powered by AI to plan your visit better.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-health-lightGreen rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎫</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Token</h3>
                <p className="text-gray-600">
                  Receive instant digital tokens for your appointments. No more paper slips.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Live Queue</h3>
                <p className="text-gray-600">
                  Track your position in real-time and see when it's your turn.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Book Appointment', desc: 'Select hospital, department, and doctor' },
              { step: '2', title: 'Get Token', desc: 'Receive your digital token number' },
              { step: '3', title: 'Track Queue', desc: 'Monitor your position in real-time' },
              { step: '4', title: 'Get Notified', desc: 'Receive alerts when your turn arrives' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

