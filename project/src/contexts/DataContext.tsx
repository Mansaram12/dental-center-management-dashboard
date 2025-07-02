import React, { createContext, useContext, useState, useEffect } from 'react';
import { DataContextType, Patient, Incident, FileAttachment } from '../types';

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const savedPatients = localStorage.getItem('dental_patients');
    const savedIncidents = localStorage.getItem('dental_incidents');
    
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
    if (savedIncidents) {
      setIncidents(JSON.parse(savedIncidents));
    }
  }, []);

  const savePatients = (updatedPatients: Patient[]) => {
    setPatients(updatedPatients);
    localStorage.setItem('dental_patients', JSON.stringify(updatedPatients));
  };

  const saveIncidents = (updatedIncidents: Incident[]) => {
    setIncidents(updatedIncidents);
    localStorage.setItem('dental_incidents', JSON.stringify(updatedIncidents));
  };

  const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: 'p' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedPatients = [...patients, newPatient];
    savePatients(updatedPatients);
  };

  const updatePatient = (id: string, patientData: Partial<Patient>) => {
    const updatedPatients = patients.map(patient =>
      patient.id === id
        ? { ...patient, ...patientData, updatedAt: new Date().toISOString() }
        : patient
    );
    savePatients(updatedPatients);
  };

  const deletePatient = (id: string) => {
    const updatedPatients = patients.filter(patient => patient.id !== id);
    const updatedIncidents = incidents.filter(incident => incident.patientId !== id);
    savePatients(updatedPatients);
    saveIncidents(updatedIncidents);
  };

  const addIncident = (incidentData: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: 'i' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedIncidents = [...incidents, newIncident];
    saveIncidents(updatedIncidents);
  };

  const updateIncident = (id: string, incidentData: Partial<Incident>) => {
    const updatedIncidents = incidents.map(incident =>
      incident.id === id
        ? { ...incident, ...incidentData, updatedAt: new Date().toISOString() }
        : incident
    );
    saveIncidents(updatedIncidents);
  };

  const deleteIncident = (id: string) => {
    const updatedIncidents = incidents.filter(incident => incident.id !== id);
    saveIncidents(updatedIncidents);
  };

  const getPatientIncidents = (patientId: string) => {
    return incidents.filter(incident => incident.patientId === patientId);
  };

  const uploadFile = async (file: File): Promise<FileAttachment> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAttachment: FileAttachment = {
          id: 'f' + Date.now(),
          name: file.name,
          url: reader.result as string,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        resolve(fileAttachment);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <DataContext.Provider value={{
      patients,
      incidents,
      addPatient,
      updatePatient,
      deletePatient,
      addIncident,
      updateIncident,
      deleteIncident,
      getPatientIncidents,
      uploadFile,
    }}>
      {children}
    </DataContext.Provider>
  );
};