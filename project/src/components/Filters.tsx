import React from 'react';
import { FilterOptions } from '../types';
import { specialties, availabilities, languages, genders } from '../data/doctors';
import { Filter, Star } from 'lucide-react';

interface FiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onApplyFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, onApplyFilters }) => {
  const handleReset = () => {
    setFilters({
      specialty: '',
      availability: '',
      minRating: 0,
      gender: '',
      language: '',
    });
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    onApplyFilters();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          Reset All
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Specialty
          </label>
          <select
            value={filters.specialty}
            onChange={(e) => handleFilterChange('specialty', e.target.value)}
            className="w-full p-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-200"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Available on
          </label>
          <select
            value={filters.availability}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
            className="w-full p-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-200"
          >
            <option value="">Any Day</option>
            {availabilities.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Doctor Gender
          </label>
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className="w-full p-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-200"
          >
            <option value="">Any Gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Languages Spoken
          </label>
          <select
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="w-full p-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-200"
          >
            <option value="">Any Language</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Minimum Rating
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.minRating}
              onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="ml-3 flex items-center min-w-[40px]">
              <span className="text-gray-700 dark:text-gray-300 font-medium mr-1">
                {filters.minRating}
              </span>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;