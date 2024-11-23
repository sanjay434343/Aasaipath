import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Wallet } from 'lucide-react';
import { TripData } from '../types';

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = React.useState<TripData & { id: number } | null>(null);

  React.useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    const foundTrip = savedTrips.find((t: any) => t.id === Number(id));
    setTrip(foundTrip || null);
  }, [id]);

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">Trip not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {trip.destination}
            </h1>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <DetailCard
                Icon={Calendar}
                label="Duration"
                value={`${trip.days} days`}
              />
              <DetailCard
                Icon={Wallet}
                label="Budget"
                value={`$${trip.budget}`}
              />
              <DetailCard
                Icon={MapPin}
                label="Location"
                value={trip.destination}
              />
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">About the Destination</h2>
                <p className="text-gray-600">{trip.destinationInfo.description}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Weather</h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-gray-600 mb-1">Temperature</div>
                      <div className="font-semibold">{trip.weatherInfo.temperature}°C</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Humidity</div>
                      <div className="font-semibold">{trip.weatherInfo.humidity}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Rain Chance</div>
                      <div className="font-semibold">{trip.weatherInfo.rainChance}%</div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Must-Visit Attractions</h2>
                <ul className="space-y-2">
                  {trip.destinationInfo.attractions.map((attraction, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-600"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full mr-3 text-sm">
                        {index + 1}
                      </span>
                      {attraction}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DetailCard({ Icon, label, value }: { Icon: any; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center mb-2">
        <Icon className="w-5 h-5 text-indigo-600 mr-2" />
        <span className="text-gray-600">{label}</span>
      </div>
      <div className="text-lg font-semibold text-gray-800">{value}</div>
    </div>
  );
}

export default TripDetails;