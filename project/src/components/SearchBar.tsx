import React, { useState } from 'react';
import { Mic, MicOff, Search } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  const { 
    isListening, 
    startListening, 
    stopListening, 
    isSupported 
  } = useSpeechRecognition({
    onResult: (result) => {
      setQuery(result);
      onSearch(result);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          className="w-full p-4 pl-10 pr-20 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 transition-all duration-200 shadow-sm"
          placeholder="Search doctors, specialties, or symptoms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isSupported && (
          <button
            type="button"
            onClick={handleVoiceSearch}
            className="absolute right-2.5 bottom-2.5 focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200"
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {isListening && (
        <div className="absolute mt-2 left-0 right-0 text-center text-sm font-medium text-blue-600 dark:text-blue-400 animate-pulse">
          Listening... Speak now
        </div>
      )}
    </form>
  );
};

export default SearchBar;