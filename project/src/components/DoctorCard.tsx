import React, { useState } from 'react';
import { Doctor } from '../types';
import { Star, MapPin, Calendar, Languages, Clock, CreditCard } from 'lucide-react';
import BookingModal from './BookingModal';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            className="h-48 w-full object-cover md:h-full" 
            src={doctor.imageUrl} 
            alt={`Dr. ${doctor.name}`} 
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Dr. {doctor.name}
              </h2>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                {doctor.specialty}
              </p>
            </div>
            <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">{doctor.rating}</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <MapPin className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
              <p className="truncate">{doctor.address}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Languages className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
              <p>{doctor.languages.join(', ')}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Clock className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
              <p>{doctor.experience} years exp.</p>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <CreditCard className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
              <p>${doctor.price}/visit</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-start">
              <Calendar className="h-4 w-4 mt-1 mr-1 text-gray-400 dark:text-gray-500" />
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p className="font-medium mb-1">Available on:</p>
                <div className="flex flex-wrap gap-1">
                  {(doctor.availability ?? []).map(day => (
                    <span 
                      key={day} 
                      className="inline-block bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded px-2 py-0.5 text-xs"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      
      <BookingModal
        doctor={doctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DoctorCard;