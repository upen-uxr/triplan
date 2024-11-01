import React, { useState } from 'react';
import { X, Plane, Hotel, Car, MapPin, Calendar } from 'lucide-react';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: any) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    type: '',
    time: '',
    title: '',
    location: '',
    details: '',
  });

  if (!isOpen) return null;

  const transportTypes = [
    { id: 'flight', icon: Plane, label: 'Flight' },
    { id: 'hotel', icon: Hotel, label: 'Hotel' },
    { id: 'transport', icon: Car, label: 'Transport' },
    { id: 'activity', icon: Calendar, label: 'Activity' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(eventData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {step === 1 ? 'Select Transport Type' : 'Add Event Details'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {step === 1 ? (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {transportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setEventData({ ...eventData, type: type.id });
                      setStep(2);
                    }}
                    className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Icon className="w-8 h-8 mb-2 text-blue-600" />
                    <span className="text-gray-700">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Flight to Paris"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={eventData.location}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Charles de Gaulle Airport"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Details
              </label>
              <textarea
                value={eventData.details}
                onChange={(e) => setEventData({ ...eventData, details: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Additional details..."
                rows={3}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 btn btn-secondary"
              >
                Back
              </button>
              <button type="submit" className="flex-1 btn btn-primary">
                Add Event
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddEventModal;