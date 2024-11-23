import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Wallet } from 'lucide-react';
import { getDestinationInfo } from '../services/geminiApi';
import { getWeatherInfo } from '../services/weatherApi';
import { TripData } from '../types';

interface TripFormProps {
  onSubmit: (data: TripData) => void;
}

function TripForm({ onSubmit }: TripFormProps) {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pass days and budget correctly as integers
      const [destinationInfo, weatherInfo] = await Promise.all([
        getDestinationInfo(destination, parseInt(days), parseInt(budget)),
        getWeatherInfo(destination),
      ]);

      // Pass collected data to the parent component
      onSubmit({
        destination,
        days: parseInt(days),
        budget: parseInt(budget),
        destinationInfo,
        weatherInfo,
      });
    } catch (error) {
      console.error('Error fetching trip data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        {/* Destination Input */}
        <FormField
          Icon={MapPin}
          label="Where to?"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
          required
        />

        {/* Days Input */}
        <FormField
          Icon={Calendar}
          label="How long?"
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Number of days"
          min="1"
          required
        />

        {/* Budget Input */}
        <FormField
          Icon={Wallet}
          label="Budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Your budget in USD"
          min="1"
          required
        />

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold transition-all ${
            loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Planning...
            </div>
          ) : (
            'Plan My Trip'
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}

// Generic FormField Component
function FormField({ Icon, label, ...props }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-gray-500" />
          <span>{label}</span>
        </div>
      </label>
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        {...props}
      />
    </motion.div>
  );
}

export default TripForm;
