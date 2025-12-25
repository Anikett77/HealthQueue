import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';

const DoctorDashboard = () => {
  const [queue, setQueue] = useState([
    {
      _id: '1',
      patientName: 'Aniket',
      queueNumber: 1,
      createdAt: new Date()
    },
    {
      _id: '2',
      patientName: 'Adarsh',
      queueNumber: 2,
      createdAt: new Date()
    },
    {
      _id: '3',
      patientName: 'Chandan',
      queueNumber: 3,
      createdAt: new Date()
    },
    {
      _id: '4',
      patientName: 'Aniket',
      queueNumber: 4,
      createdAt: new Date()
    }
  ]);

  const currentPatient = queue[0];
  const nextPatients = queue.slice(1);

  const handleMarkCompleted = () => {
    if (queue.length === 0) return;
    setQueue(queue.slice(1));
  };

  const handleSkip = () => {
    if (queue.length <= 1) return;
    const [first, ...rest] = queue;
    setQueue([...rest, first]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <p className="text-gray-500">Total Patients</p>
              <p className="text-4xl font-bold">{queue.length}</p>
            </Card>
            <Card>
              <p className="text-gray-500">Avg Consultation</p>
              <p className="text-4xl font-bold">10 min</p>
            </Card>
            <Card>
              <p className="text-gray-500">Completed</p>
              <p className="text-4xl font-bold">—</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Patient */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-bold mb-4">Current Patient</h2>

                {currentPatient ? (
                  <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
                    <p className="text-3xl font-bold text-blue-600 mb-2">
                      T{currentPatient.queueNumber.toString().padStart(3, '0')}
                    </p>

                    <p className="text-lg font-semibold">
                      {currentPatient.patientName}
                    </p>

                    <p className="text-sm text-gray-600">
                      Appointment Time:{' '}
                      {currentPatient.createdAt.toLocaleTimeString()}
                    </p>

                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="success"
                        className="flex-1"
                        onClick={handleMarkCompleted}
                      >
                        Mark Completed
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={handleSkip}
                      >
                        Skip
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No current patient
                  </p>
                )}
              </Card>
            </div>

            {/* Next Patients */}
            <div>
              <Card>
                <h2 className="text-xl font-bold mb-4">Next Patients</h2>

                {nextPatients.length > 0 ? (
                  <div className="space-y-3">
                    {nextPatients.map((p) => (
                      <div
                        key={p._id}
                        className="p-3 border rounded-lg bg-gray-50"
                      >
                        <p className="font-bold text-blue-600">
                          T{p.queueNumber.toString().padStart(3, '0')}
                        </p>
                        <p>{p.patientName}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">
                    No patients in queue
                  </p>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorDashboard;
