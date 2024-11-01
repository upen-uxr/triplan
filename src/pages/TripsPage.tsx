import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Clock } from 'lucide-react';
import Timeline from '../components/Timeline';
import { useTrips } from '../hooks/useTrips';
import CreateTripModal from '../components/CreateTripModal';
import type { DraftTrip } from '../types';

const TripsPage = () => {
  const { activeTrip, draftTrips } = useTrips();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<DraftTrip | null>(null);

  const handleDraftSelect = (draft: DraftTrip) => {
    setSelectedDraft(draft);
    setIsCreateModalOpen(true);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Trips</h2>

      {/* Active Trip Section */}
      {activeTrip ? (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {activeTrip.destination}
            </h3>
          </div>
          
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600">
                {activeTrip.startDate} - {activeTrip.endDate}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600">
                {activeTrip.location}
              </span>
            </div>
          </div>
          
          <Timeline events={activeTrip.events} />
        </div>
      ) : (
        <div className="mt-16 text-center">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80"
            alt="Travel"
            className="w-64 h-64 object-cover rounded-full mx-auto mb-8 shadow-lg"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Plan Your Next Adventure
          </h2>
          <p className="text-gray-600 mb-8">
            Create a new trip and add your itinerary details
          </p>
        </div>
      )}

      {/* Draft Trips Section - Only shown when there are drafts */}
      {draftTrips && draftTrips.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-gray-700">Saved Drafts</h3>
            <span className="text-sm text-gray-500">{draftTrips.length} drafts</span>
          </div>
          <div className="space-y-2">
            {draftTrips.map((draft) => (
              <button
                key={draft.id}
                onClick={() => handleDraftSelect(draft)}
                className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-800 group-hover:text-blue-600">
                      {draft.title || 'Untitled Trip'}
                    </h4>
                    {draft.location && (
                      <p className="text-sm text-gray-500">
                        {draft.location}
                      </p>
                    )}
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  Draft
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setSelectedDraft(null);
          setIsCreateModalOpen(true);
        }}
        className="fixed bottom-20 left-6 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-white z-10 px-6 py-4 space-x-2"
        aria-label="New Trip"
      >
        <Plus className="w-5 h-5" />
        <span className="text-sm font-medium">New Trip</span>
      </button>

      <CreateTripModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedDraft(null);
        }}
        draftData={selectedDraft}
      />
    </>
  );
};

export default TripsPage;