import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, MapPin, Maximize2, ArrowRight } from 'lucide-react';
import api from '../admin/services/api';

export default function FloorPlansPage() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const fetchPublicPlans = async () => {
      try {
        setIsLoading(true);
        const params = { isPublished: true };
        if (selectedType !== 'All') params.type = selectedType;

        const res = await api.get('/floor-plans', params);
        if (isMounted && res.success) {
          setPlans(res.floorPlans || []);
        }
      } catch (err) {
        // Handle error
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPublicPlans();
    return () => {
      isMounted = false;
    };
  }, [selectedType]);

  const planTypes = [
    'All',
    '2 BHK Executive',
    '3 BHK Luxury Residence',
    '4 BHK Presidential Suite',
    'Duplex Penthouse',
    'Signature Sky Villa'
  ];

  return (
    <div className="min-h-screen bg-[#0C0D0C] text-[#F2EEE7] pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C7A15C]/15 border border-[#C7A15C]/30 text-[#DFBE7B] text-xs uppercase tracking-widest font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>Architectural Blueprints</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2EEE7] font-display">
            Precision Floor Plans & Spatial Blueprints
          </h1>
          <p className="text-sm sm:text-base text-[#A4A49B] leading-relaxed">
            Engineered layouts maximizing natural light, cross-ventilation, and privacy.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#171916] border border-white/[0.08] max-w-2xl mx-auto">
          {planTypes.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedType === t
                  ? 'bg-[#C7A15C] text-[#0C0D0C]'
                  : 'text-[#A4A49B] hover:text-[#F2EEE7]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Blueprints Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-3xl bg-[#171916] animate-pulse"></div>
            ))}
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-[#171916] border border-white/[0.08]">
            <Compass className="w-12 h-12 text-[#C7A15C] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#F2EEE7]">No Blueprints in this Category</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="rounded-3xl bg-[#171916] border border-white/[0.08] hover:border-[#C7A15C]/40 overflow-hidden transition-all shadow-xl group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-[#101211] overflow-hidden">
                  <img
                    src={plan.imageUrl}
                    alt={plan.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-black/80 text-[#DFBE7B] border border-[#C7A15C]/40 backdrop-blur-xs">
                      {plan.areaSqFt} SQ.FT.
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#171916]/90 text-white border border-white/10">
                      {plan.bedrooms} Bed • {plan.bathrooms} Bath
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C7A15C]">
                      {plan.type}
                    </span>
                    <h3 className="text-base font-bold text-[#F2EEE7] font-display mt-0.5">
                      {plan.title}
                    </h3>
                    {plan.projectName && (
                      <span className="text-xs text-[#A4A49B] block mt-1">
                        Development: {plan.projectName}
                      </span>
                    )}

                    {plan.features && plan.features.length > 0 && (
                      <div className="space-y-1.5 my-4 pt-3 border-t border-white/[0.06]">
                        {plan.features.map((f, idx) => (
                          <div key={idx} className="flex items-center text-xs text-[#A4A49B]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A15C] mr-2"></span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#6B7068] uppercase font-mono block">
                        Estimated Valuation
                      </span>
                      <span className="text-xs font-mono font-bold text-[#F2EEE7]">
                        {plan.priceRange || 'Price on Request'}
                      </span>
                    </div>
                    <Link
                      to="/contact"
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#C7A15C]/15 text-[#DFBE7B] hover:bg-[#C7A15C] hover:text-[#0C0D0C] transition-colors"
                    >
                      Request Specs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
