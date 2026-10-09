import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FacilityItem } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface FacilitiesSectionProps {
  facilities: FacilityItem[];
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ facilities }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Fasilitas' },
    { id: 'kamar', label: 'Fasilitas Kamar' },
    { id: 'bersama', label: 'Fasilitas Bersama' },
    { id: 'keamanan', label: 'Keamanan & Akses' },
    { id: 'parkir', label: 'Parkir Kendaraan' },
  ];

  const filteredFacilities = activeCategory === 'all'
    ? facilities
    : facilities.filter((f) => f.category === activeCategory);

  return (
    <section id="fasilitas" className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kenyamanan Tanpa Kompromi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Fasilitas Lengkap & Terawat
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Dirancang untuk menunjang produktivitas dan istirahat maksimal, dengan fasilitas terawat rutin oleh staf pengelola.
          </p>
        </div>

        {/* Category Filters (Segmented control) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 group-hover:border-emerald-400 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-all">
                <DynamicIcon name={item.iconName} className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Banner (Include Perks) */}
        <div className="mt-12 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-white">Bonus Fasilitas Gratis untuk Setiap Penghuni</h4>
            <p className="text-emerald-100 text-sm max-w-xl">
              Air minum galon gratis, gas kompor dapur bersama gratis, iuran sampah & kebersihan koridor gratis, serta pembersihan filter AC berkala tanpa biaya tambahan!
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-100 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Air Galon Gratis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-100 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Bebas Iuran Sampah
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-100 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Servis AC Rutin
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
