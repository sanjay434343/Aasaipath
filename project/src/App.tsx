import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TripResult from './pages/TripResult';
import SavedTrips from './pages/SavedTrips';
import TripDetails from './pages/TripDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        <main className="container mx-auto py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/result" element={<TripResult />} />
              <Route path="/saved" element={<SavedTrips />} />
              <Route path="/trip/:id" element={<TripDetails />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '10px',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;