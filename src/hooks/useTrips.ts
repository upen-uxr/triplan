import { useState, useEffect } from 'react';
import type { Trip, DraftTrip, Event } from '../types';

const DRAFTS_STORAGE_KEY = 'tripPlanner_drafts';
const ACTIVE_TRIP_STORAGE_KEY = 'tripPlanner_activeTrip';

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [draftTrips, setDraftTrips] = useState<DraftTrip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load drafts and active trip from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedDrafts = localStorage.getItem(DRAFTS_STORAGE_KEY);
        const storedActiveTrip = localStorage.getItem(ACTIVE_TRIP_STORAGE_KEY);

        if (storedDrafts) {
          setDraftTrips(JSON.parse(storedDrafts));
        }

        if (storedActiveTrip) {
          setActiveTrip(JSON.parse(storedActiveTrip));
          setTrips([JSON.parse(storedActiveTrip)]);
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  // Save drafts to localStorage whenever they change
  useEffect(() => {
    if (draftTrips.length > 0) {
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(draftTrips));
    } else {
      localStorage.removeItem(DRAFTS_STORAGE_KEY);
    }
  }, [draftTrips]);

  // Save active trip to localStorage whenever it changes
  useEffect(() => {
    if (activeTrip) {
      localStorage.setItem(ACTIVE_TRIP_STORAGE_KEY, JSON.stringify(activeTrip));
    } else {
      localStorage.removeItem(ACTIVE_TRIP_STORAGE_KEY);
    }
  }, [activeTrip]);

  const saveDraft = (draftData: Partial<DraftTrip>) => {
    const newDraft: DraftTrip = {
      ...draftData,
      id: draftData.id || `draft-${Date.now()}`,
      status: 'draft',
      lastModified: Date.now(),
    } as DraftTrip;

    setDraftTrips(prev => {
      const existing = prev.findIndex(d => d.id === newDraft.id);
      if (existing >= 0) {
        return prev.map(d => d.id === newDraft.id ? newDraft : d);
      }
      return [...prev, newDraft];
    });
  };

  const deleteDraft = (id: string) => {
    setDraftTrips(prev => prev.filter(d => d.id !== id));
  };

  const publishTrip = (tripData: Omit<Trip, 'id'> & { id?: string }) => {
    const newTrip: Trip = {
      ...tripData,
      id: tripData.id || `trip-${Date.now()}`,
      events: tripData.events || [],
    };
    
    setActiveTrip(newTrip);
    setTrips([newTrip]);
    
    // If this was a draft, remove it from drafts
    if (tripData.id?.startsWith('draft-')) {
      deleteDraft(tripData.id);
    }
  };

  return {
    trips,
    activeTrip,
    draftTrips,
    isLoading,
    setActiveTrip,
    saveDraft,
    deleteDraft,
    publishTrip,
  };
};