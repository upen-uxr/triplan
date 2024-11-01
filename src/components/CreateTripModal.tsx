import React, { useState, useEffect, useCallback } from 'react';
import { X, Upload, MapPin, ArrowLeft, Camera } from 'lucide-react';
import DocumentUploadModal from './DocumentUploadModal';
import TripOverview from './TripOverview';
import { useTrips } from '../hooks/useTrips';
import type { DraftTrip, Trip } from '../types';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  draftData?: DraftTrip | null;
}

const CreateTripModal: React.FC<CreateTripModalProps> = ({ isOpen, onClose, draftData }) => {
  const { saveDraft } = useTrips();
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState<Partial<Trip>>({
    id: '',
    title: '',
    startDate: '',
    endDate: '',
    destination: '',
    events: [],
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'upload' | 'scan'>('upload');

  // Initialize trip data when modal opens or draft changes
  useEffect(() => {
    if (isOpen) {
      if (draftData) {
        setTripData(prev => ({
          ...prev,
          ...draftData,
          id: draftData.id,
        }));
      } else {
        setTripData({
          id: `draft-${Date.now()}`,
          title: '',
          startDate: '',
          endDate: '',
          destination: '',
          events: [],
        });
      }
      setStep(1);
    }
  }, [draftData, isOpen]);

  // Memoize the save draft function
  const handleSaveDraft = useCallback(() => {
    if (tripData.id && (tripData.title || tripData.destination)) {
      saveDraft({
        ...tripData,
        status: 'draft',
        lastModified: Date.now(),
      });
    }
  }, [tripData, saveDraft]);

  // Auto-save when tripData changes
  useEffect(() => {
    const timeoutId = setTimeout(handleSaveDraft, 1000);
    return () => clearTimeout(timeoutId);
  }, [handleSaveDraft]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleDone = () => {
    onClose();
  };

  if (step === 2) {
    return (
      <div className="fixed inset-0 bg-white z-50">
        <div className="sticky top-0 bg-white border-b border-gray-200">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center h-16">
              <button
                onClick={() => setStep(1)}
                className="p-2 hover:bg-gray-100 rounded-lg mr-2"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">Trip Overview</h2>
              </div>
              <button 
                onClick={handleDone}
                className="btn btn-primary"
              >
                Done
              </button>
            </div>
          </div>
        </div>

        <TripOverview
          title={tripData.title || ''}
          startDate={tripData.startDate || ''}
          endDate={tripData.endDate || ''}
          destination={tripData.destination || ''}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="sticky top-0 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg mr-2"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">Create New Trip</h2>
              <div className="text-sm text-gray-500">Fill in details or import from documents</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trip Title
            </label>
            <input
              type="text"
              value={tripData.title || ''}
              onChange={(e) => setTripData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., Paris Adventure"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={tripData.startDate || ''}
                onChange={(e) => setTripData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={tripData.endDate || ''}
                onChange={(e) => setTripData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={tripData.destination || ''}
                onChange={(e) => setTripData(prev => ({ ...prev, destination: e.target.value }))}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Paris, France"
                required
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Import Documents</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setUploadType('upload');
                setShowUploadModal(true);
              }}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Upload className="w-6 h-6 mb-2 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Upload Documents</span>
              <span className="text-xs text-gray-500">PDF, Images</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUploadType('scan');
                setShowUploadModal(true);
              }}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Camera className="w-6 h-6 mb-2 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Scan Documents</span>
              <span className="text-xs text-gray-500">Take Photos</span>
            </button>
          </div>

          <button type="submit" className="w-full btn btn-primary py-3">
            Create Trip
          </button>
        </form>
      </div>

      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={(files) => {
          console.log('Uploaded files:', files);
          setShowUploadModal(false);
        }}
        type={uploadType}
      />
    </div>
  );
};

export default CreateTripModal;