import React from 'react';
import { 
  Activity, 
  Calendar, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  DollarSign
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const PatientDashboard: React.FC = () => {
  const { incidents, patients } = useData();
  const { user } = useAuth();

  const currentPatient = patients.find(p => p.id === user?.patientId);
  const patientIncidents = incidents.filter(incident => incident.patientId === user?.patientId);
  
  const upcomingAppointments = patientIncidents
    .filter(incident => new Date(incident.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());

  const completedTreatments = patientIncidents.filter(incident => incident.status === 'Completed');
  const totalCost = completedTreatments.reduce((sum, incident) => sum + (incident.cost || 0), 0);

  const stats = [
    {
      title: 'Upcoming Appointments',
      value: upcomingAppointments.length,
      icon: Calendar,
      color: 'bg-primary-500'
    },
    {
      title: 'Completed Treatments',
      value: completedTreatments.length,
      icon: CheckCircle,
      color: 'bg-success-500'
    },
    {
      title: 'Total Treatments',
      value: patientIncidents.length,
      icon: Activity,
      color: 'bg-secondary-500'
    },
    {
      title: 'Total Cost',
      value: `$${totalCost.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-accent-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success-100 text-success-800';
      case 'In Progress':
        return 'bg-warning-100 text-warning-800';
      case 'Scheduled':
        return 'bg-primary-100 text-primary-800';
      case 'Cancelled':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {currentPatient?.name || 'Patient'}
          </h1>
          <p className="text-gray-600 mt-1">Here's your dental health overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{appointment.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {new Date(appointment.appointmentDate).toLocaleDateString()} at{' '}
                        {new Date(appointment.appointmentDate).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {appointment.cost && (
                        <span className="font-medium text-gray-900">${appointment.cost}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No upcoming appointments</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Treatment History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Treatments</h2>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {completedTreatments.slice(0, 5).map((treatment) => (
                <div key={treatment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{treatment.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(treatment.appointmentDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {treatment.cost && (
                      <p className="font-medium text-gray-900">${treatment.cost}</p>
                    )}
                    <p className="text-xs text-gray-500">{treatment.files.length} files</p>
                  </div>
                </div>
              ))}
              {completedTreatments.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No completed treatments yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Patient Profile Summary */}
      {currentPatient && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Profile Summary</h2>
              <User className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Contact</p>
                <p className="text-gray-900">{currentPatient.contact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Date of Birth</p>
                <p className="text-gray-900">{new Date(currentPatient.dob).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Emergency Contact</p>
                <p className="text-gray-900">{currentPatient.emergencyContact}</p>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <p className="text-sm font-medium text-gray-500 mb-1">Health Information</p>
                <p className="text-gray-900">{currentPatient.healthInfo}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;