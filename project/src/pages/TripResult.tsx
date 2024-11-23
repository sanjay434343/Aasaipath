import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, BookmarkPlus, ArrowLeft, MapPin, Calendar, Wallet, Sun, Cloud, CloudRain, Thermometer, Wind, Umbrella, Sunrise, Sunset } from 'lucide-react';
import toast from 'react-hot-toast';
import ShareModal from '../components/ShareModal'; // Ensure this path is correct

const WeatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
};

function TripResult() {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [tripData, setTripData] = React.useState(null);

  React.useEffect(() => {
    const data = localStorage.getItem('currentTrip');
    if (data) {
      setTripData(JSON.parse(data));
    }
  }, []);

  if (!tripData) return null;

  const handleSave = () => {
    const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    const newTrip = { ...tripData, id: Date.now() };
    savedTrips.push(newTrip);
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
    toast.success('Trip saved to your collection!');
    navigate('/saved');
  };

  const handleShare = () => {
    setShowShareModal(true); // Open the share modal when clicked
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-800 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">New Search</span>
          </button>
          <div className="flex gap-2">
           
            <ActionButton Icon={BookmarkPlus} onClick={handleSave} label="Save" />
          </div>
        </div>

        {/* Destination Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
          <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{tripData.destination}</h1>
            <div className="flex flex-wrap gap-4 text-blue-100 text-sm">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {tripData.days} days
              </span>
              <span className="flex items-center">
                <Wallet className="w-4 h-4 mr-1" />
                ${tripData.budget}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {tripData.destination}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Weather Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <Thermometer className="w-6 h-6 mr-2 text-blue-600" />
              Weather Forecast
            </h2>

            {/* Main Weather Display */}
            <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-center">
                    <Sun className="w-16 h-16 text-amber-500" />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-3">
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {tripData.weatherInfo.temperature}°C
                  </div>
                  <div className="text-gray-600">
                    Feels like {tripData.weatherInfo.temperature - 2}°C
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Weather Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <WeatherDetailCard
                Icon={Wind}
                label="Wind Speed"
                value="12 km/h"
                color="text-blue-600"
              />
              <WeatherDetailCard
                Icon={Umbrella}
                label="Rain Chance"
                value={`${tripData.weatherInfo.rainChance}%`}
                color="text-indigo-600"
              />
              <WeatherDetailCard
                Icon={Cloud}
                label="Humidity"
                value={`${tripData.weatherInfo.humidity}%`}
                color="text-cyan-600"
              />
              <WeatherDetailCard
                Icon={Sun}
                label="UV Index"
                value="Moderate"
                color="text-amber-500"
              />
            </div>

            {/* Daily Forecast */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">5-Day Forecast</h3>
              <div className="grid grid-cols-5 gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="text-sm text-gray-600 mb-2">
                      {new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <Sun className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                    <div className="text-sm font-medium text-gray-800">
                      {Math.round(tripData.weatherInfo.temperature - i)}°
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sunrise/Sunset */}
            <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4">
              <div className="text-center">
                <Sunrise className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                <div className="text-sm text-gray-600">Sunrise</div>
                <div className="font-medium">6:30 AM</div>
              </div>
              <div className="text-center">
                <Sunset className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                <div className="text-sm text-gray-600">Sunset</div>
                <div className="font-medium">7:45 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Attractions Section - Simplified for Mobile */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Must-Visit Attractions</h2>
            <div className="space-y-3">
              {tripData.destinationInfo.attractions.map((attraction, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-lg mr-3 text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">{attraction}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} content={tripData} />}
    </div>
  );
}

function ActionButton({ Icon, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-gray-700" />
    </button>
  );
}

function WeatherDetailCard({ Icon, label, value, color }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className={`w-8 h-8 ${color} mb-2`} />
      <div className="text-sm text-gray-600">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

export default TripResult;
