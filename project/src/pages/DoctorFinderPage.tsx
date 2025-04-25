import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DoctorList from '../components/DoctorList';
import { Doctor, FilterOptions } from '../types';
import { UserSearch } from 'lucide-react';
import { useDoctors } from '../hooks/useDoctors';

const DoctorFinderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: doctors = [], isLoading } = useDoctors();
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<FilterOptions>({
    specialty: searchParams.get('specialty') || '',
    availability: searchParams.get('availability') || '',
    minRating: Number(searchParams.get('minRating')) || 0,
    gender: searchParams.get('gender') || '',
    language: searchParams.get('language') || '',
    consultationMode: searchParams.get('consultationMode') || '',
    sortBy: (searchParams.get('sortBy') as FilterOptions['sortBy']) || '',
  });

  const applyFilters = useCallback(() => {
    if (!doctors.length) return;

    let results = [...doctors];
    const query = searchQuery.toLowerCase().trim();

    // Apply search filter
    if (query) {
      results = results.filter(doctor => 
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.specialty) {
      results = results.filter(doctor => doctor.specialty === filters.specialty);
    }
    if (filters.consultationMode) {
      results = results.filter(doctor => 
        doctor.consultationMode === filters.consultationMode || 
        doctor.consultationMode === 'both'
      );
    }
    if (filters.minRating > 0) {
      results = results.filter(doctor => doctor.rating >= filters.minRating);
    }
    if (filters.gender) {
      results = results.filter(doctor => doctor.gender === filters.gender);
    }
    if (filters.language) {
      results = results.filter(doctor => doctor.languages.includes(filters.language));
    }

    // Apply sorting
    if (filters.sortBy) {
      results.sort((a, b) => {
        if (filters.sortBy === 'fees') {
          return a.price - b.price;
        }
        return b.experience - a.experience;
      });
    }

    setFilteredDoctors(results);

    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (filters.specialty) params.set('specialty', filters.specialty);
    if (filters.consultationMode) params.set('consultationMode', filters.consultationMode);
    if (filters.minRating) params.set('minRating', filters.minRating.toString());
    if (filters.gender) params.set('gender', filters.gender);
    if (filters.language) params.set('language', filters.language);
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    setSearchParams(params);
  }, [doctors, searchQuery, filters, setSearchParams]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Find Your Ideal Doctor
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Search from our network of qualified healthcare professionals
        </p>
      </div>
      
      <div className="mb-8">
        <SearchBar 
          onSearch={setSearchQuery} 
          initialValue={searchQuery}
          data-testid="autocomplete-input"
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <Filters 
            filters={filters} 
            setFilters={setFilters}
            onApplyFilters={applyFilters}
          />
        </div>
        
        <div className="md:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <UserSearch className="w-5 h-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Result' : 'Results'} Found
                </h2>
              </div>
            </div>
          </div>
          
          <DoctorList 
            doctors={filteredDoctors}
            isFiltered={Boolean(searchQuery || Object.values(filters).some(v => v !== ''))}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorFinderPage;