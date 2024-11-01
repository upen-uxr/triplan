import React from 'react';
import { Upload, Camera, Calendar, MapPin } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: <Upload className="w-6 h-6" />,
      label: 'Upload',
      color: 'bg-blue-500',
    },
    {
      icon: <Camera className="w-6 h-6" />,
      label: 'Scan',
      color: 'bg-purple-500',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'Schedule',
      color: 'bg-green-500',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Explore',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          className="flex flex-col items-center space-y-2"
        >
          <div
            className={`${action.color} p-4 rounded-xl text-white shadow-sm hover:shadow-md transition-shadow`}
          >
            {action.icon}
          </div>
          <span className="text-sm text-gray-600">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;