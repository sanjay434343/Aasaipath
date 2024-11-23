import React from 'react';
import { motion } from 'framer-motion';
import { Share2, BookmarkPlus, Sun, Cloud, Umbrella } from 'lucide-react';
import { TripData } from '../types';
import ShareModal from './ShareModal';
import toast from 'react-hot-toast';

interface TripResultProps {
  tripData: TripData;
}

function TripResult({ tripData }: TripResultProps) {
  const [showShareModal, setShowShareModal] = React.useState(false);

  const handleSave = () => {
    const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    savedTrips.push({ ...tripData, id: Date.now() });
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
    toast.success('Trip saved successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {tripData.destination}
            </h2>
            <p className="text-gray-600">
              {tripData.days} days • ${tripData.budget} budget
            </p>
          </div>
          <div className="flex space-x-2">
            <ActionButton
              Icon={Share2}
              onClick={() => setShowShareModal(true)}
              label="Share"
            />
            <ActionButton
              Icon={BookmarkPlus}
              onClick={handleSave}
              label="Save"
            />
          </div>
        </div>

        <div className="space-y-6">
          <WeatherSection weather={tripData.weatherInfo} />
          <DestinationInfo info={tripData.destinationInfo} />
        </div>
      </div>

      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
    </motion.div>
  );
}

function ActionButton({ Icon, onClick, label }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      title={label}
    >
      <Icon className="w-5 h-5 text-gray-600" />
    </motion.button>
  );
}

function WeatherSection({ weather }: any) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Weather Forecast</h3>
      <div className="grid grid-cols-3 gap-4">
        <WeatherCard
          Icon={Sun}
          label="Temperature"
          value={`${weather.temperature}°C`}
        />
        <WeatherCard
          Icon={Cloud}
          label="Humidity"
          value={`${weather.humidity}%`}
        />
        <WeatherCard
          Icon={Umbrella}
          label="Rain Chance"
          value={`${weather.rainChance}%`}
        />
      </div>
    </div>
  );
}

function WeatherCard({ Icon, label, value }: any) {
  return (
    <div className="text-center">
      <Icon className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
      <div className="text-sm text-gray-600">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function DestinationInfo({ info }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Destination Highlights</h3>
      <p className="text-gray-600">{info.description}</p>
      <div>
        <h4 className="font-medium mb-2">Popular Attractions:</h4>
        <ul className="list-disc list-inside text-gray-600">
          {info.attractions.map((attraction: string, index: number) => (
            <li key={index}>{attraction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TripResult;