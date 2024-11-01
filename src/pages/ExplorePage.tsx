import React from 'react';
import { Search, Star, Navigation2 } from 'lucide-react';

const ExplorePage = () => {
  const places = [
    {
      name: 'Eiffel Tower',
      image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&auto=format&fit=crop&q=80',
      rating: 4.8,
      distance: '1.2 km',
      category: 'Landmark',
    },
    {
      name: 'Louvre Museum',
      image: 'https://images.unsplash.com/photo-1544413660-299165566b1d?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      distance: '2.5 km',
      category: 'Museum',
    },
    {
      name: 'Notre-Dame',
      image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800&auto=format&fit=crop&q=80',
      rating: 4.7,
      distance: '3.1 km',
      category: 'Cathedral',
    },
  ];

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore</h2>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search places..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      <div className="space-y-6">
        {places.map((place) => (
          <div
            key={place.name}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{place.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{place.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{place.category}</span>
                <div className="flex items-center">
                  <Navigation2 className="w-4 h-4 mr-1" />
                  {place.distance}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;