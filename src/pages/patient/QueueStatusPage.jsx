import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { queueAPI } from '../../utils/api';

const QueueStatusPage = () => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get('appointmentId');
  const [queueData, setQueueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const fetchQueueStatus = async () => {
    if (!appointmentId) {
      setError('No appointment ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await queueAPI.getPatientQueueStatus(appointmentId);
      setQueueData(data);
    } catch (err) {
      console.error('Error fetching queue status:', err);
      setError(err.message || 'Failed to load queue status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueStatus();
    // Refresh every 10 seconds
    const interval = setInterval(fetchQueueStatus, 10000);
    return () => clearInterval(interval);
  }, [appointmentId]);

  useEffect(() => {
    if (queueData && queueData.queue) {
      const totalInQueue = queueData.queue.length;
      const position = queueData.patientsAhead + 1;
      setProgress(totalInQueue > 0 ? ((totalInQueue - position) / totalInQueue) * 100 : 0);
    }
  }, [queueData]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading queue status...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !queueData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center py-12">
              <p className="text-red-600 mb-4">{error || 'No queue data available'}</p>
              <Button variant="primary" onClick={fetchQueueStatus}>
                Retry
              </Button>
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Live Queue Status</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 mb-2">Your Token Number</p>
                <p className="text-5xl font-bold text-primary-600 mb-4">{queueData.myToken}</p>
                <div className="bg-primary-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Current Token Being Served</p>
                  <p className="text-2xl font-bold text-gray-900">{queueData.currentToken}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Patients Ahead of You</p>
                  <p className="text-4xl font-bold text-health-green">{queueData.patientsAhead}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-gray-600 mb-2 text-center">Estimated Waiting Time</p>
                  <p className="text-3xl font-bold text-primary-600 text-center">
                    {queueData.estimatedWaitTime} <span className="text-lg">minutes</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Queue Progress</h2>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Your Position</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-500 to-health-green h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${progress}%` }}
                >
                  {progress > 20 && (
                    <span className="text-white text-xs font-semibold">{queueData.myToken}</span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Queue</h2>
            <div className="space-y-3">
              {queueData.queue.map((patient, index) => (
                <div
                  key={patient.token}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    patient.status === 'current'
                      ? 'bg-primary-50 border-primary-500'
                      : patient.token === queueData.myToken
                      ? 'bg-health-lightGreen border-health-green'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        patient.status === 'current'
                          ? 'bg-primary-600 text-white'
                          : patient.token === queueData.myToken
                          ? 'bg-health-green text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{patient.token}</p>
                      <p className="text-sm text-gray-600">{patient.name}</p>
                    </div>
                  </div>
                  <div>
                    {patient.status === 'current' && (
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Current
                      </span>
                    )}
                    {patient.token === queueData.myToken && patient.status !== 'current' && (
                      <span className="bg-health-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                        You
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-6 text-center">
            <Button variant="primary" onClick={fetchQueueStatus}>
              Refresh Queue Status
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QueueStatusPage;

