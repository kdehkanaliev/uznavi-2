
import React, { useState, useEffect, useRef } from 'react';
import UziChat from './components/UziChat';
import PlaceCard from './components/PlaceCard';
import PlaceDetailModal from './components/PlaceDetailModal';
import { MOCK_PLACES, MOCK_GUIDES } from './constants';
import { generateItinerary } from './services/geminiService';
import { BudgetTier, TripType, Pace, User, Place } from './types';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'onboarding' | 'home' | 'map' | 'food' | 'guides' | 'profile'>('onboarding');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleOnboardingComplete = async (data: any) => {
    setLoading(true);
    try {
      const result = await generateItinerary(data);
      setItinerary(result);
      setUser({
        id: 'user123',
        name: 'Guest Traveler',
        email: 'guest@uznavi.com',
        isPremium: true, // Auto-premium for 6 months
        currencyPref: 'USD'
      });
      setScreen('home');
    } catch (err) {
      console.error(err);
      setScreen('home');
    } finally {
      setLoading(false);
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <UziChat onComplete={handleOnboardingComplete} />;
      case 'home':
        return <HomeScreen itinerary={itinerary} onPlaceClick={(p) => setSelectedPlace(p)} />;
      case 'map':
        return <MapScreen itinerary={itinerary} onPlaceClick={(p) => setSelectedPlace(p)} />;
      case 'food':
        return <FoodScreen onPlaceClick={(p) => setSelectedPlace(p)} />;
      case 'guides':
        return <GuidesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen itinerary={itinerary} onPlaceClick={(p) => setSelectedPlace(p)} />;
    }
  };

  if (loading) {
    return (
      <div className="mobile-frame bg-sky-500 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
             <i className="fas fa-robot text-4xl"></i>
          </div>
          <p className="font-bold text-xl mb-1">Tailoring your journey...</p>
          <p className="text-sm opacity-80">UzNavi is finding the best routes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-frame">
      {/* 6 Month Free Banner */}
      {screen !== 'onboarding' && (
        <div className="bg-amber-100 text-amber-800 px-4 py-2 text-[10px] font-bold text-center border-b border-amber-200 z-[60]">
          <i className="fas fa-gift mr-2"></i> GLOBAL LAUNCH SPECIAL: ALL FEATURES 100% FREE FOR 6 MONTHS!
        </div>
      )}

      {renderScreen()}
      
      {selectedPlace && (
        <PlaceDetailModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}

      {screen !== 'onboarding' && (
        <nav className="h-20 bg-white border-t border-slate-100 flex items-center justify-around px-2 sticky bottom-0 z-50">
          <NavItem icon="home" active={screen === 'home'} onClick={() => setScreen('home')} label="Home" />
          <NavItem icon="map" active={screen === 'map'} onClick={() => setScreen('map')} label="Map" />
          <NavItem icon="utensils" active={screen === 'food'} onClick={() => setScreen('food')} label="Food" />
          <NavItem icon="id-badge" active={screen === 'guides'} onClick={() => setScreen('guides')} label="Guides" />
          <NavItem icon="user" active={screen === 'profile'} onClick={() => setScreen('profile')} label="Profile" />
        </nav>
      )}
    </div>
  );
};

const NavItem = ({ icon, active, onClick, label }: { icon: string, active: boolean, onClick: () => void, label: string }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center flex-1 space-y-1">
    <i className={`fas fa-${icon} text-lg ${active ? 'text-sky-500 scale-110' : 'text-slate-400'} transition-all`}></i>
    <span className={`text-[10px] font-medium ${active ? 'text-sky-500' : 'text-slate-400'}`}>{label}</span>
  </button>
);

const HomeScreen = ({ itinerary, onPlaceClick }: { itinerary: any, onPlaceClick: (p: Place) => void }) => (
  <div className="flex-1 overflow-y-auto bg-slate-50">
    <div className="p-6 bg-sky-500 text-white rounded-b-[40px] shadow-lg mb-6 pt-12">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold">Assalomu alaykum!</h1>
           <p className="text-sky-100 text-sm">Explore Uzbekistan's hidden gems.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
          <i className="fas fa-bell"></i>
        </div>
      </div>
    </div>

    <div className="px-6 space-y-8 pb-24">
      {/* Itinerary Summary */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800">Your Route</h2>
          <span className="text-sky-500 text-xs font-bold bg-sky-50 px-3 py-1 rounded-full cursor-pointer">Edit Route</span>
        </div>
        <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100">
          <div className="space-y-6">
            {itinerary?.days?.[0]?.stops.map((stop: any, idx: number) => (
              <div key={idx} className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-sky-500 ring-4 ring-sky-50"></div>
                  {idx !== itinerary.days[0].stops.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 my-1"></div>}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{stop.time}</p>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">{stop.placeName}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{stop.activity}</p>
                </div>
              </div>
            ))}
            {!itinerary && (
              <div className="text-center py-4">
                 <p className="text-slate-400 italic text-sm">No itinerary yet.</p>
                 <button className="text-sky-500 text-xs font-bold mt-2">Start with Uzi Chat</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Must Visit Grid */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800">Must Visit</h2>
          <button className="text-sky-500 text-xs font-bold">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {MOCK_PLACES.filter(p => p.category !== 'Restaurant').map(place => (
            <PlaceCard key={place.id} place={place} onClick={() => onPlaceClick(place)} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

const FoodScreen = ({ onPlaceClick }: { onPlaceClick: (p: Place) => void }) => {
  const restaurants = MOCK_PLACES.filter(p => p.category === 'Restaurant');
  
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 pt-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Local Cuisine</h1>
        <p className="text-slate-500 text-sm mt-1">Taste the authentic flavors of Uzbekistan.</p>
      </div>

      <div className="space-y-6 pb-24">
        {/* Featured Restaurants */}
        <div className="grid grid-cols-2 gap-4">
          {restaurants.map(place => (
            <PlaceCard key={place.id} place={place} onClick={() => onPlaceClick(place)} />
          ))}
          {/* Adding some variety for display if only one mock restaurant exists */}
          {MOCK_PLACES.filter(p => p.category === 'Market').map(place => (
            <PlaceCard key={place.id} place={place} onClick={() => onPlaceClick(place)} />
          ))}
        </div>

        {/* Categories / Tags */}
        <div>
          <h3 className="font-bold text-slate-800 mb-4">Popular Cuisines</h3>
          <div className="flex flex-wrap gap-2">
            {['Plov', 'Shashlik', 'Somsa', 'Laghman', 'Tea Houses', 'Fine Dining'].map(tag => (
              <span key={tag} className="px-4 py-2 bg-white rounded-2xl text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MapScreen = ({ itinerary, onPlaceClick }: { itinerary: any, onPlaceClick: (p: Place) => void }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize Leaflet Map
      const L = (window as any).L;
      const initialCoords = [41.3111, 69.2406]; // Tashkent default
      mapRef.current = L.map(mapContainerRef.current).setView(initialCoords, 13);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(mapRef.current);

      // Add pins for mock places
      MOCK_PLACES.forEach(place => {
        const marker = L.marker([place.lat, place.lng]).addTo(mapRef.current);
        marker.bindPopup(`<b>${place.name}</b><br>${place.category}`);
        marker.on('click', () => onPlaceClick(place));
      });

      // Draw Route if itinerary exists
      if (itinerary?.days?.[0]) {
        const routeCoords: any[] = [];
        itinerary.days[0].stops.forEach((stop: any) => {
          // Find matching mock place or default to Tashkent center
          const place = MOCK_PLACES.find(p => p.name.includes(stop.placeName) || stop.placeName.includes(p.name));
          if (place) routeCoords.push([place.lat, place.lng]);
        });
        
        if (routeCoords.length > 1) {
          const polyline = L.polyline(routeCoords, {color: '#0ea5e9', weight: 4, dashArray: '5, 10'}).addTo(mapRef.current);
          mapRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });
        }
      }
    }
  }, [itinerary]);

  return (
    <div className="flex-1 relative flex flex-col">
      <div className="flex-1 bg-slate-200" ref={mapContainerRef}></div>
      
      {/* Floating Search Bar */}
      <div className="absolute top-6 left-6 right-6 z-[10]">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white flex items-center space-x-3">
          <i className="fas fa-search text-slate-400"></i>
          <input type="text" placeholder="Search Samarkand monuments..." className="bg-transparent focus:outline-none flex-1 text-sm font-medium" />
          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500">
             <i className="fas fa-sliders-h"></i>
          </div>
        </div>
      </div>

      {/* Floating Tools */}
      <div className="absolute top-24 right-6 z-[10] flex flex-col space-y-3">
         <button className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-600 active:scale-90">
            <i className="fas fa-location-arrow"></i>
         </button>
         <button className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-600 active:scale-90">
            <i className="fas fa-layer-group"></i>
         </button>
      </div>

      {/* Bottom Route Preview Sheet */}
      <div className="absolute bottom-6 left-6 right-6 z-[10]">
         <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-slate-800">Live Navigation Ready</span>
               </div>
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Optimized Route</span>
            </div>
            <div className="flex items-center space-x-4">
               <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 text-xl">
                  <i className="fas fa-route"></i>
               </div>
               <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800">Daily Loop: Old City</h4>
                  <p className="text-xs text-slate-500">4 Stops • 12.4 km • 45 min drive</p>
               </div>
               <button className="bg-sky-500 text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 shadow-md">
                  Start
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const GuidesScreen = () => (
  <div className="flex-1 overflow-y-auto bg-slate-50 p-6 pt-12">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-slate-800">VIP Guides</h1>
      <p className="text-slate-500 text-sm mt-1">Book certified professional experts.</p>
    </div>
    <div className="space-y-4 pb-24">
      {MOCK_GUIDES.map(guide => (
        <div key={guide.id} className="bg-white p-4 rounded-[28px] shadow-sm border border-slate-100 flex space-x-4">
          <img src={guide.image} className="w-24 h-24 rounded-2xl object-cover" />
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800 text-sm">{guide.name}</h3>
                <span className="text-sky-500 font-bold text-sm">${guide.hourly_rate}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">{guide.experience_years}y Exp • {guide.languages.join(', ')}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {guide.specialties.slice(0, 2).map(s => (
                  <span key={s} className="text-[8px] bg-sky-50 text-sky-600 px-2 py-1 rounded-full font-bold uppercase">{s}</span>
                ))}
              </div>
              <button className="bg-sky-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold">Book Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProfileScreen = () => (
  <div className="flex-1 overflow-y-auto bg-white pt-12">
    <div className="p-8 text-center border-b border-slate-50 relative">
      <div className="w-28 h-28 rounded-[40px] bg-slate-100 mx-auto mb-4 border-4 border-white shadow-2xl overflow-hidden rotate-3">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Alex Explorer</h2>
      <p className="text-sm text-slate-500 mb-4">Silver Badge Traveler</p>
      <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-4 py-2 rounded-full border border-emerald-100">
        <i className="fas fa-check-circle"></i>
        <span>PREMIUM ACTIVE (FREE TRIAL)</span>
      </div>
    </div>

    <div className="p-6 space-y-4 pb-24">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-sky-50 p-4 rounded-3xl text-center">
          <p className="text-2xl font-bold text-sky-600">12</p>
          <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Trips</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-3xl text-center">
          <p className="text-2xl font-bold text-amber-600">4</p>
          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Badges</p>
        </div>
      </div>
      
      <ProfileItem icon="heart" label="Saved Places" />
      <ProfileItem icon="download" label="Offline Maps (Free)" />
      <ProfileItem icon="ticket-alt" label="Tickets & Bookings" />
      <ProfileItem icon="cog" label="Account Settings" />
      
      <div className="pt-6">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4 px-2 tracking-widest">24/7 Support</h3>
        <div className="flex space-x-3">
          <a href="tel:102" className="flex-1 flex items-center justify-center space-x-2 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 active:scale-95 transition-all">
            <i className="fas fa-shield-alt"></i>
            <span className="font-bold text-xs uppercase">Police</span>
          </a>
          <a href="tel:101" className="flex-1 flex items-center justify-center space-x-2 p-4 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 active:scale-95 transition-all">
            <i className="fas fa-ambulance"></i>
            <span className="font-bold text-xs uppercase">Medical</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

const ProfileItem = ({ icon, label }: { icon: string, label: string }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-sky-500 group-hover:shadow-sm transition-all">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <span className="font-bold text-slate-700 text-sm">{label}</span>
    </div>
    <i className="fas fa-chevron-right text-slate-300 text-[10px]"></i>
  </div>
);

export default App;
