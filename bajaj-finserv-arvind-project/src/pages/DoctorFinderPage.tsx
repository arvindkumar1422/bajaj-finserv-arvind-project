import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DoctorList from '../components/DoctorList';
import { Doctor, FilterOptions } from '../types';
import { doctors as allDoctors } from '../data/doctors';
import { UserSearch } from 'lucide-react';

const DoctorFinderPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(allDoctors);
  const [isSearched, setIsSearched] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    specialty: '',
    availability: '',
    minRating: 0,
    gender: '',
    language: '',
  });

  // Search doctors based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearched(query.trim() !== '');
    applyFilters(query, filters);
  };

  // Apply all filters
  const applyFilters = (query = searchQuery, currentFilters = filters) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    
    let results = allDoctors;
    
    // Apply search query filter
    if (lowerCaseQuery) {
      results = results.filter(doctor => 
        doctor.name.toLowerCase().includes(lowerCaseQuery) ||
        doctor.specialty.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    // Apply specialty filter
    if (currentFilters.specialty) {
      results = results.filter(doctor => 
        doctor.specialty === currentFilters.specialty
      );
    }
    
    // Apply availability filter
    if (currentFilters.availability) {
      results = results.filter(doctor => 
        doctor.availability.includes(currentFilters.availability)
      );
    }
    
    // Apply rating filter
    if (currentFilters.minRating > 0) {
      results = results.filter(doctor => 
        doctor.rating >= currentFilters.minRating
      );
    }
    
    // Apply gender filter
    if (currentFilters.gender) {
      results = results.filter(doctor => 
        doctor.gender === currentFilters.gender
      );
    }
    
    // Apply language filter
    if (currentFilters.language) {
      results = results.filter(doctor => 
        doctor.languages.includes(currentFilters.language)
      );
    }
    
    setFilteredDoctors(results);
    
    // Set filtered state if any filter is active
    setIsFiltered(
      currentFilters.specialty !== '' ||
      currentFilters.availability !== '' ||
      currentFilters.minRating > 0 ||
      currentFilters.gender !== '' ||
      currentFilters.language !== ''
    );
  };

  // Handle apply filters button click
  const handleApplyFilters = () => {
    applyFilters();
  };

  // Number of active filters for display
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.specialty) count++;
    if (filters.availability) count++;
    if (filters.minRating > 0) count++;
    if (filters.gender) count++;
    if (filters.language) count++;
    return count;
  }, [filters]);

  // Initialize with all doctors
  useEffect(() => {
    setFilteredDoctors(allDoctors);
  }, []);

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
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <Filters 
            filters={filters} 
            setFilters={setFilters} 
            onApplyFilters={handleApplyFilters} 
          />
        </div>
        
        <div className="md:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 transition-colors duration-300">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <UserSearch className="w-5 h-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isSearched || isFiltered 
                    ? `${filteredDoctors.length} ${filteredDoctors.length === 1 ? 'Result' : 'Results'} Found` 
                    : 'All Doctors'}
                </h2>
              </div>
              
              {activeFilterCount > 0 && (
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {activeFilterCount} {activeFilterCount === 1 ? 'Filter' : 'Filters'} Applied
                </span>
              )}
            </div>
          </div>
          
          <DoctorList 
            doctors={filteredDoctors} 
            isFiltered={isFiltered || isSearched} 
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorFinderPage;