import React, { useState } from 'react';
import { Map, Calendar, MapPin } from 'lucide-react';
import Header from './components/Header';
import TripsPage from './pages/TripsPage';
import SchedulePage from './pages/SchedulePage';
import ExplorePage from './pages/ExplorePage';
import BottomNav from './components/BottomNav';

function App() {
  const [activeTab, setActiveTab] = useState('trips');

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <SchedulePage />;
      case 'explore':
        return <ExplorePage />;
      default:
        return <TripsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl pb-20">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;