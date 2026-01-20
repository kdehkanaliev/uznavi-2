
import React from 'react';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
  onClick?: (id: string) => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
  return (
    <div 
      onClick={() => onClick?.(place.id)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-all cursor-pointer"
    >
      <div className="relative h-40">
        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-slate-800">
          {place.price_range}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-800 truncate">{place.name}</h3>
          <span className="text-[10px] uppercase font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full">
            {place.category}
          </span>
        </div>
        <p className="text-slate-500 text-xs line-clamp-2 mb-3">
          {place.description}
        </p>
        <div className="flex items-center space-x-1 overflow-x-hidden">
          {place.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md whitespace-nowrap">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
