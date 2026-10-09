import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Maximize2,
  Users,
  Check,
  Calendar,
  BedDouble,
  Tag,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { RoomType, RoomUnit } from '../types';
import { formatRupiah } from '../utils/helpers';

interface RoomShowcaseSectionProps {
  roomTypes: RoomType[];
  rooms: RoomUnit[];
  onSelectTypeForBooking: (typeId: string) => void;
  onSelectTypeForSurvey: (typeId: string) => void;
}

export const RoomShowcaseSection: React.FC<RoomShowcaseSectionProps> = ({
  roomTypes,
  rooms,
  onSelectTypeForBooking,
  onSelectTypeForSurvey,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<{ [key: string]: number }>({});
  const [detailModalType, setDetailModalType] = useState<RoomType | null>(null);

  const getAvailableRoomsCountForType = (typeId: string) => {
    return rooms.filter((r) => r.typeId === typeId && r.status === 'available').length;
  };

  const handleNextPhoto = (typeId: string, totalPhotos: number) => {
    const current = activePhotoIdx[typeId] || 0;
    setActivePhotoIdx((prev) => ({
      ...prev,
      [typeId]: (current + 1) % totalPhotos,
    }));
  };

  const handlePrevPhoto = (typeId: string, totalPhotos: number) => {
    const current = activePhotoIdx[typeId] || 0;
    setActivePhotoIdx((prev) => ({
      ...prev,
      [typeId]: (current - 1 + totalPhotos) % totalPhotos,
    }));
  };

  return (
    <section id="kamar" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pilihan Tipe Kamar & Tarif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Desain Kamar Nyaman & Siap Huni
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Seluruh kamar telah dilengkapi perabot lengkap (full furnished), kasur empuk, AC dingin, dan kamar mandi pribadi di dalam. Tinggal bawa koper!
          </p>
        </div>

        {/* Room Types Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomTypes.map((type) => {
            const currentPhotoIndex = activePhotoIdx[type.id] || 0;
            const availableCount = getAvailableRoomsCountForType(type.id);
            const activeImage = type.images[currentPhotoIndex] || type.images[0];

            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className={`bg-white rounded-3xl overflow-hidden border flex flex-col justify-between transition-all shadow-sm hover:shadow-xl ${
                  type.isPopular
                    ? 'border-emerald-500/80 ring-2 ring-emerald-500/20'
                    : 'border-slate-200/90'
                }`}
              >
                <div>
                  {/* Photo Carousel Area */}
                  <div className="relative h-64 w-full bg-slate-100 overflow-hidden group">
                    <img
                      src={activeImage}
                      alt={type.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                    {/* Top tags: Popular badge & Availability count */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {type.isPopular ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-600 text-white shadow-md">
                          <Sparkles className="w-3 h-3" />
                          Terpopuler
                        </span>
                      ) : (
                        <div />
                      )}

                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
                          availableCount > 0
                            ? 'bg-slate-900/80 text-emerald-300'
                            : 'bg-rose-900/80 text-rose-200'
                        }`}
                      >
                        {availableCount > 0 ? `${availableCount} Kamar Kosong` : 'Kamar Penuh'}
                      </span>
                    </div>

                    {/* Carousel controls if multi photos */}
                    {type.images.length > 1 && (
                      <>
                        <button
                          onClick={() => handlePrevPhoto(type.id, type.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          aria-label="Foto Sebelumnya"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleNextPhoto(type.id, type.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          aria-label="Foto Selanjutnya"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                          {type.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() =>
                                setActivePhotoIdx((prev) => ({ ...prev, [type.id]: idx }))
                              }
                              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                idx === currentPhotoIndex ? 'bg-white w-4' : 'bg-white/50'
                              }`}
                              aria-label={`Lihat foto ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Title & Tagline */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {type.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{type.tagline}</p>
                    </div>

                    {/* Quick Specs (Size, Bed, Capacity) */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-slate-50 rounded-2xl border border-slate-100 text-center mb-5">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Ukuran</span>
                        <span className="text-xs font-bold text-slate-800">{type.size.split(' ')[0]} m</span>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Ranjang</span>
                        <span className="text-xs font-bold text-slate-800 truncate block px-1">
                          {type.bedType.split(' ')[0]}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Kapasitas</span>
                        <span className="text-xs font-bold text-slate-800">{type.maxGuests} Orang</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Fasilitas Kamar
                      </p>
                      <ul className="space-y-2">
                        {type.features.slice(0, 5).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {type.features.length > 5 && (
                        <button
                          onClick={() => setDetailModalType(type)}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 mt-2 flex items-center gap-1 cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>+{type.features.length - 5} fasilitas lainnya (Lihat Detail)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="p-6 pt-0 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-4 mt-4">
                    <div>
                      <span className="text-[11px] text-slate-500 block uppercase font-semibold">Tarif Sewa</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-900">
                          {formatRupiah(type.priceMonthly)}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/bulan</span>
                      </div>
                    </div>

                    {type.priceYearly && (
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Hemat sewa tahunan
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectTypeForSurvey(type.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Survey
                    </button>

                    <button
                      onClick={() => onSelectTypeForBooking(type.id)}
                      disabled={availableCount === 0}
                      className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs ${
                        availableCount > 0
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <BedDouble className="w-3.5 h-3.5" />
                      {availableCount > 0 ? 'Pesan Kamar' : 'Penuh'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailModalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button
                onClick={() => setDetailModalType(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Tutup Detail"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-slate-900">{detailModalType.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{detailModalType.tagline}</p>

              {/* Photos preview */}
              <div className="grid grid-cols-2 gap-2 my-5">
                {detailModalType.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${detailModalType.name} ${idx + 1}`}
                    className="w-full h-36 object-cover rounded-xl"
                  />
                ))}
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Deskripsi Kamar</h4>
                  <p className="text-slate-600 leading-relaxed">{detailModalType.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Ukuran Ruangan</span>
                    <p className="font-bold text-slate-900">{detailModalType.size}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Tipe Kasur</span>
                    <p className="font-bold text-slate-900">{detailModalType.bedType}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Kapasitas Maksimal</span>
                    <p className="font-bold text-slate-900">{detailModalType.maxGuests} Orang</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Tarif Bulanan</span>
                    <p className="font-extrabold text-emerald-700">
                      {formatRupiah(detailModalType.priceMonthly)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Seluruh Fasilitas Termasuk</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {detailModalType.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => {
                    const tid = detailModalType.id;
                    setDetailModalType(null);
                    onSelectTypeForBooking(tid);
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center cursor-pointer"
                >
                  Pesan Tipe Ini Sekarang
                </button>
                <button
                  onClick={() => {
                    const tid = detailModalType.id;
                    setDetailModalType(null);
                    onSelectTypeForSurvey(tid);
                  }}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Jadwal Survey
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
