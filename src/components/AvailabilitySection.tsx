import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, BedDouble, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { RoomUnit, RoomType } from '../types';

interface AvailabilitySectionProps {
  rooms: RoomUnit[];
  roomTypes: RoomType[];
  onSelectRoomForBooking: (room: RoomUnit) => void;
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  rooms,
  roomTypes,
  onSelectRoomForBooking,
}) => {
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');

  // Floors available
  const floors = Array.from(new Set(rooms.map((r) => r.floor))).sort((a, b) => a - b);

  const filteredRooms = selectedFloor === 'all'
    ? rooms
    : rooms.filter((r) => r.floor === selectedFloor);

  const availableCount = rooms.filter((r) => r.status === 'available').length;
  const occupiedCount = rooms.filter((r) => r.status === 'occupied').length;
  const bookedCount = rooms.filter((r) => r.status === 'booked').length;

  const getTypeName = (typeId: string) => {
    const found = roomTypes.find((t) => t.id === typeId);
    return found ? found.name : 'Standard';
  };

  return (
    <section id="ketersediaan" className="py-16 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Ketersediaan Kamar Realtime</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Status Unit Kamar Saat Ini
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Lihat denah unit kamar yang siap dihuni. Klik unit kamar yang berstatus <strong className="text-emerald-700">Tersedia</strong> untuk langsung memilih nomor kamar tersebut pada formulir reservasi.
          </p>
        </div>

        {/* Status Legend & Summary Counter */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Quick Counter */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
              <span className="text-slate-700 font-medium">Tersedia:</span>
              <strong className="text-emerald-700 font-bold text-base">{availableCount} Kamar</strong>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-400" />
              <span className="text-slate-700 font-medium">Terisi:</span>
              <strong className="text-slate-700 font-bold text-base">{occupiedCount} Kamar</strong>
            </div>

            {bookedCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-slate-700 font-medium">Booked / Tertahan:</span>
                <strong className="text-amber-700 font-bold text-base">{bookedCount} Kamar</strong>
              </div>
            )}
          </div>

          {/* Floor Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs self-start md:self-auto">
            <button
              onClick={() => setSelectedFloor('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedFloor === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Semua Lantai ({rooms.length})
            </button>
            {floors.map((fl) => (
              <button
                key={fl}
                onClick={() => setSelectedFloor(fl)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedFloor === fl
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Lantai {fl} ({rooms.filter((r) => r.floor === fl).length})
              </button>
            ))}
          </div>
        </div>

        {/* Room Matrix Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredRooms.map((room) => {
            const isAvailable = room.status === 'available';
            const isOccupied = room.status === 'occupied';
            const isBooked = room.status === 'booked';
            const typeName = getTypeName(room.typeId);

            return (
              <motion.div
                key={room.id}
                whileHover={isAvailable ? { y: -3, transition: { duration: 0.15 } } : {}}
                className={`relative rounded-2xl p-4 border transition-all text-left flex flex-col justify-between ${
                  isAvailable
                    ? 'bg-white border-emerald-300 hover:border-emerald-500 hover:shadow-md cursor-pointer group ring-2 ring-emerald-500/10'
                    : isBooked
                    ? 'bg-amber-50/50 border-amber-200/80 cursor-not-allowed opacity-90'
                    : 'bg-slate-100/70 border-slate-200 cursor-not-allowed opacity-75'
                }`}
                onClick={() => {
                  if (isAvailable) {
                    onSelectRoomForBooking(room);
                  }
                }}
              >
                {/* Header: Room Number & Floor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                      #{room.roomNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      Lt. {room.floor}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-600 line-clamp-1 mb-3">
                    {typeName}
                  </p>
                </div>

                {/* Status Indicator & Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  {isAvailable && (
                    <>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Tersedia
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Pilih <ChevronRight className="w-3 h-3" />
                      </span>
                    </>
                  )}

                  {isBooked && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Booked
                    </span>
                  )}

                  {isOccupied && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <XCircle className="w-3.5 h-3.5 text-slate-400" />
                      Terisi
                    </span>
                  )}
                </div>

                {/* Small indicator hint for interactive available rooms */}
                {isAvailable && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 block" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Help Tip */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>
            Memerlukan kamar dengan jendela menghadap luar atau lantai bawah? Silakan konsultasikan via WhatsApp pengelola atau ajukan survey lokasi.
          </p>
        </div>

      </div>
    </section>
  );
};
