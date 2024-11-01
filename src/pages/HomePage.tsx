import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import Timeline from '../components/Timeline';
import { useTrips } from '../hooks/useTrips';

const HomePage = () => {
  const { activeTrip } = useTrips();

  return (
    <>
      {activeTrip ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {activeTrip.destination}
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">
                  {activeTrip.startDate} - {activeTrip.endDate}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">
                  {activeTrip.location}
                </span>
              </div>
            </div>
            
            <Timeline events={activeTrip.events} />
          </div>
        </div>
      ) : (
        <div className="mt-16 text-center">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80"
            alt="Travel"
            className="w-64 h-64 object-cover rounded-full mx-auto mb-8 shadow-lg"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Start Planning Your Trip
          </h2>
          <p className="text-gray-600 mb-8">
            Upload your travel documents or create a new trip from scratch
          </p>
        </div>
      )}
    </>
  );
};

export default HomePage;