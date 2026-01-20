
import React from 'react';
import { Place } from '../types';

interface PlaceDetailModalProps {
  place: Place;
  onClose: () => void;
}

const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({ place, onClose }) => {
  return (
    <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-end">
      <div 
        className="bg-white rounded-t-[32px] w-full max-h-[90%] overflow-y-auto animate-slide-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 w-full">
          <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="bg-sky-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-2 inline-block">
              {place.category}
            </span>
            <h2 className="text-2xl font-bold text-white shadow-sm">{place.name}</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="flex items-center justify-between py-4 border-b border-slate-100">
            <div className="text-center flex-1">
              <p className="text-xl font-bold text-slate-800">{place.rating}</p>
              <div className="text-amber-400 text-xs">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">{place.reviewCount} Reviews</p>
            </div>
            <div className="w-px h-10 bg-slate-100 mx-4"></div>
            <div className="text-center flex-1">
              <p className="text-xl font-bold text-slate-800">{place.price_range}</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Pricing</p>
            </div>
            <div className="w-px h-10 bg-slate-100 mx-4"></div>
            <div className="text-center flex-1">
              <p className="text-xl font-bold text-sky-500"><i className="fas fa-map-marker-alt"></i></p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Directions</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-slate-800 mb-2">About</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Working Hours</p>
              <p className="text-xs font-medium text-slate-700">{place.opening_hours}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Phone</p>
              <p className="text-xs font-medium text-slate-700">{place.phone}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button className="flex-1 bg-sky-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-200 active:scale-95 transition-all">
              Book Ticket Online
            </button>
            <button className="w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center text-xl active:scale-95 transition-all">
              <i className="fas fa-directions"></i>
            </button>
            <button className="w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center text-xl active:scale-95 transition-all">
              <i className="far fa-heart"></i>
            </button>
          </div>

          {/* Reviews */}
          <div className="pb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Reviews</h3>
              <button className="text-sky-500 text-xs font-bold">Write a review</button>
            </div>
            <div className="space-y-4">
              {place.reviews.map((review, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-slate-800">{review.userName}</span>
                    <span className="text-[10px] text-slate-400">{review.date}</span>
                  </div>
                  <div className="text-amber-400 text-[10px] mb-2">
                    {[...Array(review.rating)].map((_, j) => <i key={j} className="fas fa-star"></i>)}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailModal;
