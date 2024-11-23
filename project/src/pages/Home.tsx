import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Map, Sparkles, ChevronDown } from 'lucide-react';
import TripForm from '../components/TripForm';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleTripSubmit = (tripData) => {
    localStorage.setItem('currentTrip', JSON.stringify(tripData));
    navigate('/result');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-multiply"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 400 + 100}px`,
                height: `${Math.random() * 400 + 100}px`,
                background: i % 2 === 0 ? '#E0E7FF' : '#EEF2FF',
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">AI-Powered Travel Planning</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Journey Begins with a 
            <span className="text-blue-600"> Perfect Plan</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience seamless travel planning with AI. From hidden gems to popular destinations, 
            create your ideal itinerary in minutes.
          </p>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => setShowForm(true)}
              className="group bg-blue-600 text-white px-8 py-4 rounded-full font-medium text-lg 
                       hover:bg-blue-700 transition-all duration-300 hover:shadow-lg
                       hover:shadow-blue-200 flex items-center gap-2"
            >
              <Compass className="w-5 h-5" />
              Start Your Adventure
            </button>
            
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="text-gray-500 flex items-center gap-2 hover:text-gray-700 transition-colors"
              >
                <ChevronDown className="w-5 h-5 animate-bounce" />
                <span>Explore Options</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Map className="w-6 h-6 text-blue-600" />}
            title="Smart Discovery"
            description="Find hidden gems and local favorites tailored to your interests"
          />
          <FeatureCard
            icon={<Compass className="w-6 h-6 text-blue-600" />}
            title="Perfect Routes"
            description="Optimized itineraries that make the most of your time"
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6 text-blue-600" />}
            title="AI Powered"
            description="Personalized recommendations based on your preferences"
          />
        </div>
      </div>

      {/* Trip Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Plan Your Trip</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <TripForm onSubmit={handleTripSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 
                  transition-all duration-300 hover:shadow-lg hover:shadow-blue-50">
    <div className="mb-4 inline-block p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 
                    transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;  