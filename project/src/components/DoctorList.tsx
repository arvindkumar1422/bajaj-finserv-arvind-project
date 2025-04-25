import React from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
  isFiltered: boolean;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, isFiltered }) => {
  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isFiltered 
            ? "No doctors match your filters" 
            : "No doctors found"}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {isFiltered 
            ? "Try adjusting your filter criteria" 
            : "Please try a different search term"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;