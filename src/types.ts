export interface Event {
  type: 'flight' | 'hotel' | 'transport' | 'activity';
  time: string;
  title: string;
  location: string;
  details: string;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  location: string;
  events: Event[];
}

export interface DraftTrip {
  id: string;
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  events?: Event[];
  status: 'draft';
  lastModified: number;
}