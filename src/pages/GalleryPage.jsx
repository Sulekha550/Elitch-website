import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Sparkles, X, Maximize2 } from 'lucide-react';
import api from '../admin/services/api';

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPublicGallery = async () => {
      try {
        setIsLoading(true);
        const params = { isPublished: true };
        if (selectedCategory !== 'All') params.category = selectedCategory;

        const res = await api.get('/gallery', params);
        if (isMounted && res.success) {
          setItems(res.items || []);
        }
      } catch (err) {
        // Handle error
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPublicGallery();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const categories = [
    'All',
    'Exterior Architecture',
    'Interior Living',
    'Landscape & Grounds',
    'Penthouses & Terraces'
  ];

  return (
    <div className="min-h-screen bg-[#0C0D0C] text-[#F2EEE7] pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C7A15C]/15 border border-[#C7A15C]/30 text-[#DFBE7B] text-xs uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Imagery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2EEE7] font-display">
            The Visual Archive of Landmark Living
          </h1>
          <p className="text-sm sm:text-base text-[#A4A49B] leading-relaxed">
            High-fidelity elevations, sunset terraces, imported marble salons, and biophilic gardens.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#171916] border border-white/[0.08] max-w-2xl mx-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c
                  ? 'bg-[#C7A15C] text-[#0C0D0C]'
                  : 'text-[#A4A49B] hover:text-[#F2EEE7]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Gallery Masonry / Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-3xl bg-[#171916] animate-pulse"></div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-[#171916] border border-white/[0.08]">
            <ImageIcon className="w-12 h-12 text-[#C7A15C] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#F2EEE7]">No Photographs Available</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative rounded-3xl overflow-hidden bg-[#171916] border border-white/[0.08] hover:border-[#C7A15C]/50 cursor-pointer aspect-square shadow-xl"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C7A15C] mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#F2EEE7] font-display">
                    {item.title}
                  </h3>
                  {item.projectName && (
                    <span className="text-xs text-[#A4A49B] mt-0.5">
                      {item.projectName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in"
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-xs text-[#C7A15C] font-mono uppercase tracking-wider block">
                  {activeLightboxItem.category} • {activeLightboxItem.projectName}
                </span>
                <h3 className="text-base font-bold text-[#F2EEE7] mt-1 font-display">
                  {activeLightboxItem.title}
                </h3>
                {activeLightboxItem.description && (
                  <p className="text-xs text-[#A4A49B] max-w-md mx-auto mt-1">
                    {activeLightboxItem.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
