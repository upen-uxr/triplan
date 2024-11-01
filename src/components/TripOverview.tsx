import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Plus } from 'lucide-react';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';
import AddEventModal from './AddEventModal';
import { useTrips } from '../hooks/useTrips';
import type { Trip } from '../types';

interface TripOverviewProps {
  title: string;
  startDate: string;
  endDate: string;
  destination: string;
}

const TripOverview: React.FC<TripOverviewProps> = ({
  title,
  startDate,
  endDate,
  destination,
}) => {
  const [activeDay, setActiveDay] = useState(0);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const { publishTrip } = useTrips();

  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const totalDays = differenceInDays(end, start) + 1;
  const days = Array.from({ length: totalDays }, (_, i) => ({
    date: addDays(start, i),
    events: [],
  }));

  // Create trip on component mount
  useEffect(() => {
    const trip: Trip = {
      id: `trip-${Date.now()}`,
      destination: title,
      startDate,
      endDate,
      location: destination,
      events: [],
    };
    publishTrip(trip);
  }, [title, startDate, endDate, destination, publishTrip]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Travelling to {title}
        </h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>
              {format(start, 'MMM d')} - {format(end, 'MMM d, yyyy')}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{destination}</span>
          </div>
        </div>
      </div>

      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-3 pb-2">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`flex flex-col items-center p-3 rounded-[20px] transition-colors flex-shrink-0 w-[72px] ${
                activeDay === index
                  ? 'bg-blue-600 text-white'
                  : 'border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={`text-xs font-medium mb-1 ${
                activeDay === index ? 'text-blue-100' : 'text-gray-500'
              }`}>
                Day {index + 1}
              </span>
              <span className="text-lg font-bold">
                {format(day.date, 'd')}
              </span>
              <span className={`text-xs ${
                activeDay === index ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {format(day.date, 'EEE')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <p className="text-gray-600 mb-4">No events planned for this day</p>
        <button
          onClick={() => setShowAddEvent(true)}
          className="btn btn-primary inline-flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Event
        </button>
      </div>

      <AddEventModal
        isOpen={showAddEvent}
        onClose={() => setShowAddEvent(false)}
        onAdd={(event) => {
          console.log('New event:', event);
          setShowAddEvent(false);
        }}
      />
    </div>
  );
};

export default TripOverview;