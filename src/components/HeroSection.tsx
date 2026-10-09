import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Wifi, Wind, Car, ArrowRight, Calendar, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { KostProfile, RoomUnit, RoomType } from '../types';
import { formatRupiah } from '../utils/helpers';

interface HeroSectionProps {
  profile: KostProfile;
  rooms: RoomUnit[];
  roomTypes: RoomType[];
  onOpenReservation: () => void;
  onOpenSurvey: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  rooms,
  roomTypes,
  onOpenReservation,
  onOpenSurvey,
}) => {
  const availableRoomsCount = rooms.filter((r) => r.status === 'available').length;
  const lowestPrice = Math.min(...roomTypes.map((rt) => rt.priceMonthly));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 -translate-y-12 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Availability Pill & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {availableRoomsCount > 0 ? `Tersisa ${availableRoomsCount} Kamar Kosong` : 'Semua Kamar Penuh'}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {profile.city}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Kost {profile.genderType} Nyaman
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              {profile.tagline.replace('Nyaman & Nyaman', 'Nyaman & Strategis')}
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {profile.shortBio}
            </p>

            {/* Quick Selling Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>KM Dalam & AC Dingin</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WiFi 100 Mbps Bebas Kuota</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>CCTV & Akses Kartu 24 Jam</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Pesan Kamar Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSurvey}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-emerald-800 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-xl border border-slate-300/80 shadow-xs transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Jadwalkan Survey Lokasi</span>
              </button>
            </div>

            {/* Pricing info badge */}
            <div className="flex items-center gap-3 pt-1 text-xs text-slate-500">
              <p>
                Sewa mulai dari <strong className="text-slate-900 font-bold text-sm">{formatRupiah(lowestPrice)}</strong>/bulan
              </p>
              <span>·</span>
              <p>Bisa bulanan & tahunan</p>
              <span>·</span>
              <p>Bebas biaya admin</p>
            </div>

          </motion.div>

          {/* Right Image Showcase / Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white bg-slate-100">
                <img
                  src={profile.heroImage}
                  alt={profile.name}
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Bottom Card Overlay info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-bold text-white text-base">{profile.name}</h2>
                        <p className="text-xs text-slate-300 mt-0.5">{profile.address}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block">Mulai</span>
                        <span className="font-extrabold text-base text-white">{formatRupiah(lowestPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat card top-left */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm">
                  ★ 4.9
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Kost Pilihan Favorit</p>
                  <p className="text-[11px] text-slate-500">Tingkat kepuasan tinggi</p>
                </div>
              </div>

              {/* Floating feature card bottom-right */}
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Aman & Terpantau</p>
                  <p className="text-[11px] text-slate-500">Penjaga 24/7 di tempat</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
