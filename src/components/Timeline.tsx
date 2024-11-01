import React from 'react';
import { Clock, MapPin, Hotel, Plane, Car } from 'lucide-react';

interface Event {
  type: 'flight' | 'hotel' | 'transport';
  time: string;
  title: string;
  location: string;
  details: string;
}

interface TimelineProps {
  events: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-5 h-5" />;
      case 'hotel':
        return <Hotel className="w-5 h-5" />;
      case 'transport':
        return <Car className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div
          key={index}
          className="relative pl-8 pb-8 last:pb-0"
        >
          {/* Timeline line */}
          {index !== events.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
          )}
          
          {/* Event dot */}
          <div className={`absolute left-2 top-2 w-4 h-4 rounded-full ${
            event.type === 'flight' ? 'bg-blue-500' :
            event.type === 'hotel' ? 'bg-purple-500' : 'bg-green-500'
          }`}></div>
          
          {/* Event content */}
          <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getIcon(event.type)}
                <span className="font-medium text-gray-800">{event.title}</span>
              </div>
              <span className="text-sm text-gray-500">{event.time}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            
            <p className="mt-2 text-sm text-gray-600">{event.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;