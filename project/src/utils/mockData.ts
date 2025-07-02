import { User, Patient, Incident } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    role: 'Admin',
    email: 'admin@entnt.in',
    password: 'admin123'
  },
  {
    id: '2',
    role: 'Patient',
    email: 'john@entnt.in',
    password: 'patient123',
    patientId: 'p1'
  },
  {
    id: '3',
    role: 'Patient',
    email: 'jane@entnt.in',
    password: 'patient123',
    patientId: 'p2'
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    dob: '1990-05-10',
    contact: '1234567890',
    email: 'john@entnt.in',
    address: '123 Main St, City, State 12345',
    healthInfo: 'No known allergies. History of orthodontic treatment.',
    emergencyContact: 'Jane Doe - 0987654321',
    insuranceInfo: 'Blue Cross Blue Shield - Policy #12345',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'p2',
    name: 'Jane Smith',
    dob: '1985-03-20',
    contact: '9876543210',
    email: 'jane@entnt.in',
    address: '456 Oak Ave, City, State 54321',
    healthInfo: 'Allergic to penicillin. Previous root canal treatment.',
    emergencyContact: 'John Smith - 1122334455',
    insuranceInfo: 'Aetna - Policy #67890',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'p3',
    name: 'Robert Johnson',
    dob: '1978-11-15',
    contact: '5551234567',
    email: 'robert@example.com',
    address: '789 Pine Rd, City, State 13579',
    healthInfo: 'Diabetic. Regular cleaning every 3 months.',
    emergencyContact: 'Mary Johnson - 5559876543',
    insuranceInfo: 'Cigna - Policy #24681',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z'
  }
];

export const mockIncidents: Incident[] = [
  {
    id: 'i1',
    patientId: 'p1',
    title: 'Routine Cleaning',
    description: 'Regular dental cleaning and checkup',
    comments: 'Good oral health, no issues found',
    appointmentDate: '2025-01-15T10:00:00Z',
    cost: 120,
    treatment: 'Professional cleaning and fluoride treatment',
    status: 'Completed',
    nextDate: '2025-07-15T10:00:00Z',
    files: [],
    createdAt: '2024-12-15T08:00:00Z',
    updatedAt: '2024-12-15T08:00:00Z'
  },
  {
    id: 'i2',
    patientId: 'p1',
    title: 'Toothache Treatment',
    description: 'Upper molar pain requiring examination',
    comments: 'Sensitive to cold, possible cavity',
    appointmentDate: '2025-01-25T14:00:00Z',
    status: 'Scheduled',
    files: [],
    createdAt: '2024-12-20T16:30:00Z',
    updatedAt: '2024-12-20T16:30:00Z'
  },
  {
    id: 'i3',
    patientId: 'p2',
    title: 'Crown Replacement',
    description: 'Replace old crown on lower left molar',
    comments: 'Crown showing signs of wear',
    appointmentDate: '2025-01-22T11:00:00Z',
    cost: 850,
    treatment: 'Crown removal and replacement',
    status: 'In Progress',
    files: [],
    createdAt: '2024-12-18T13:45:00Z',
    updatedAt: '2024-12-18T13:45:00Z'
  },
  {
    id: 'i4',
    patientId: 'p3',
    title: 'Diabetes Checkup',
    description: 'Routine checkup for diabetic patient',
    comments: 'Monitor gum health closely',
    appointmentDate: '2025-01-30T09:30:00Z',
    status: 'Scheduled',
    files: [],
    createdAt: '2024-12-22T11:00:00Z',
    updatedAt: '2024-12-22T11:00:00Z'
  }
];

export const initializeData = () => {
  if (!localStorage.getItem('dental_users')) {
    localStorage.setItem('dental_users', JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem('dental_patients')) {
    localStorage.setItem('dental_patients', JSON.stringify(mockPatients));
  }
  if (!localStorage.getItem('dental_incidents')) {
    localStorage.setItem('dental_incidents', JSON.stringify(mockIncidents));
  }
};