import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import DoctorFinderPage from './pages/DoctorFinderPage';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main>
          <DoctorFinderPage />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;