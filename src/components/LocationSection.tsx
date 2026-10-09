import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, ExternalLink, GraduationCap, Bus, UtensilsCrossed, HeartPulse, ShoppingBag } from 'lucide-react';
import { KostProfile, NearbyPlace } from '../types';

interface LocationSectionProps {
  profile: KostProfile;
  nearbyPlaces: NearbyPlace[];
}

export const LocationSection: React.FC<LocationSectionProps> = ({ profile, nearbyPlaces }) => {
  const getPoiIcon = (category: string) => {
    switch (category) {
      case 'kampus':
        return <GraduationCap className="w-4 h-4 text-emerald-600" />;
      case 'transportasi':
        return <Bus className="w-4 h-4 text-emerald-600" />;
      case 'kuliner':
        return <UtensilsCrossed className="w-4 h-4 text-emerald-600" />;
      case 'kesehatan':
        return <HeartPulse className="w-4 h-4 text-emerald-600" />;
      case 'belanja':
      default:
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <section id="lokasi" className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lokasi Sangat Strategis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Akses Mudah ke Segala Penjuru
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Terletak di pusat aktivitas, dekat halte transportasi umum, kampus, gedung perkantoran, minimarket, serta ragam kuliner lezat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map Box */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-lg relative h-[380px] sm:h-[460px]">
            {profile.googleMapsEmbed ? (
              <iframe
                title="Peta Lokasi Kost"
                src={profile.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400">
                <MapPin className="w-12 h-12 mb-2" />
                <p>Google Maps Embed belum disetel</p>
              </div>
            )}

            {/* Float badge overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-md flex items-center justify-between gap-3">
              <div className="truncate">
                <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{profile.name}</p>
                <p className="text-slate-500 text-[11px] sm:text-xs truncate">{profile.address}</p>
              </div>
              <a
                href={profile.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(profile.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <span>Buka Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: POI list */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-600" />
                Jarak & Akses Terdekat
              </h3>
              <p className="text-xs text-slate-500">
                Estimasi waktu tempuh dari lokasi gerbang kost menuju titik-titik krusial:
              </p>
            </div>

            <div className="space-y-2.5">
              {nearbyPlaces.map((poi) => (
                <div
                  key={poi.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      {getPoiIcon(poi.category)}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{poi.name}</h4>
                      <span className="text-[10px] text-slate-400 capitalize">{poi.category}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 shrink-0">
                    {poi.distance}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 mt-4">
              <p>
                💡 <strong>Akses Jalan:</strong> Jalan depan kost lebar, muat papasan 2 mobil, bebas banjir sepanjang tahun, dan memiliki penerangan jalan yang terang saat malam hari.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
