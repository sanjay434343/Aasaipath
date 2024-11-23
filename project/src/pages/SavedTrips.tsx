import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, MapPin, Calendar, DollarSign, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TripData } from '../types';
import toast from 'react-hot-toast';
import { jsPDF } from "jspdf";  // Import jsPDF

function SavedTrips() {
  const [savedTrips, setSavedTrips] = React.useState<(TripData & { id: number })[]>(() => {
    return JSON.parse(localStorage.getItem('savedTrips') || '[]');
  });

  const navigate = useNavigate();

  const deleteTrip = (id: number) => {
    const newTrips = savedTrips.filter(trip => trip.id !== id);
    setSavedTrips(newTrips);
    localStorage.setItem('savedTrips', JSON.stringify(newTrips));
    toast.success('Trip deleted successfully!');
  };

  const handlePlanNewTripClick = () => {
    navigate('/');
  };

  // Handle the PDF generation for a single trip
  const handleDownloadPdfClick = (trip: TripData & { id: number }) => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text(`Trip to: ${trip.destination}`, 10, 10); // Destination header
    doc.setFontSize(12);
    doc.text(`Duration: ${trip.days} days`, 10, 20); // Days
    doc.text(`Budget: $${trip.budget}`, 10, 30); // Budget
    
    doc.setFontSize(14);
    doc.text('Weather Information:', 10, 40); // Weather section header
    doc.setFontSize(12);
    doc.text(`Temperature: ${trip.weatherInfo.temperature}°C`, 10, 50);
    doc.text(`Humidity: ${trip.weatherInfo.humidity}%`, 10, 60);
    doc.text(`Rain Chance: ${trip.weatherInfo.rainChance}%`, 10, 70);
    
    doc.setFontSize(14);
    doc.text('Popular Attractions:', 10, 80); // Attractions section header
    doc.setFontSize(12);
    trip.destinationInfo.attractions.forEach((attraction, index) => {
      doc.text(`- ${attraction}`, 10, 90 + (index * 10));
    });

    doc.save(`trip_${trip.id}_details.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
            Your Saved Adventures
          </h1>
          <p className="text-gray-600 text-lg">Discover and manage your planned journeys</p>
        </div>

        {savedTrips.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-lg p-12 text-center"
          >
            <div className="mb-6">
              <MapPin className="w-16 h-16 text-indigo-400 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No saved trips yet</h2>
            <p className="text-gray-600 mb-8">Start planning your next adventure and save it here!</p>
            <button 
              onClick={handlePlanNewTripClick} 
              className="inline-block text-white bg-blue-600 px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors mt-6 relative z-10 border-2 border-blue-500"
            >
              Plan a New Trip
            </button>
          </motion.div>
        ) : (
          <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {savedTrips.map((trip) => (
              <SavedTripCard 
                key={trip.id} 
                trip={trip} 
                onDelete={deleteTrip}
                onDownloadPdf={handleDownloadPdfClick}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function SavedTripCard({ trip, onDelete, onDownloadPdf }: { trip: TripData & { id: number }; onDelete: (id: number) => void; onDownloadPdf: (trip: TripData & { id: number }) => void }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
      id={`trip-${trip.id}`}
    >
      <div className="relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(trip.id)}
            className="p-2 text-red-600 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>

        <Link to={`/trip/${trip.id}`} className="block p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{trip.destination}</h2>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{trip.days} days</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>${trip.budget}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6">
            <h3 className="font-semibold mb-4 text-blue-600">Weather Forecast</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center bg-white p-3 rounded-xl">
                <span className="text-sm text-gray-600">Temp</span>
                <span className="font-bold text-gray-800">{trip.weatherInfo.temperature}°C</span>
              </div>
              <div className="flex flex-col items-center bg-white p-3 rounded-xl">
                <span className="text-sm text-gray-600">Humidity</span>
                <span className="font-bold text-gray-800">{trip.weatherInfo.humidity}%</span>
              </div>
              <div className="flex flex-col items-center bg-white p-3 rounded-xl">
                <span className="text-sm text-gray-600">Rain</span>
                <span className="font-bold text-gray-800">{trip.weatherInfo.rainChance}%</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-blue-600">Popular Attractions</h3>
            <ul className="space-y-2">
              {trip.destinationInfo.attractions.map((attraction: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-2" />
                  <span className="text-gray-600">{attraction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Download PDF Button for each trip */}
          <div className="mt-6 text-center">
            <button 
              onClick={(e) => {
                e.preventDefault();  // Prevent navigation
                onDownloadPdf(trip);
              }} 
              className="inline-flex items-center text-white bg-green-600 px-8 py-3 rounded-xl hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />  {/* Download icon */}
              Download Trip
            </button>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export default SavedTrips;
