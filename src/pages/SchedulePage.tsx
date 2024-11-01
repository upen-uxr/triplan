import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    {
      time: '09:00 AM',
      title: 'Eiffel Tower Visit',
      location: 'Champ de Mars, Paris',
    },
    {
      time: '12:30 PM',
      title: 'Lunch at Le Cheval Blanc',
      location: 'Place Dauphine, Paris',
    },
    {
      time: '03:00 PM',
      title: 'Louvre Museum Tour',
      location: 'Rue de Rivoli, Paris',
    },
  ];

  const weekDays = [
    { id: 'sun', label: 'S' },
    { id: 'mon', label: 'M' },
    { id: 'tue', label: 'T' },
    { id: 'wed', label: 'W' },
    { id: 'thu', label: 'T' },
    { id: 'fri', label: 'F' },
    { id: 'sat', label: 'S' },
  ];

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule</h2>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <CalendarIcon className="w-6 h-6 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold">March 15, 2024</h3>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Clock className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div key={day.id} className="text-center text-gray-500 text-sm">
              {day.label}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <button
              key={`day-${i + 1}`}
              className={`aspect-square rounded-full flex items-center justify-center text-sm ${
                i + 1 === 15
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={`event-${index}`}
            className="bg-white rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-800">{event.time}</span>
              <span className="text-blue-600 text-sm">1.5h</span>
            </div>
            <h4 className="font-medium mb-2">{event.title}</h4>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {event.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;