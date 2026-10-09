import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  BedDouble,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  Tag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  KostProfile,
  RoomType,
  RoomUnit,
  ReservationRequest,
  SurveyRequest
} from '../types';
import {
  formatRupiah,
  createWhatsappUrl,
  generateReservationWhatsappText,
  generateSurveyWhatsappText
} from '../utils/helpers';

interface ReservationSurveySectionProps {
  profile: KostProfile;
  roomTypes: RoomType[];
  rooms: RoomUnit[];
  activeTab: 'reservation' | 'survey';
  setActiveTab: (tab: 'reservation' | 'survey') => void;
  selectedRoomForBooking?: RoomUnit | null;
  selectedRoomTypeId?: string | null;
  onAddReservation: (res: ReservationRequest) => void;
  onAddSurvey: (srv: SurveyRequest) => void;
}

export const ReservationSurveySection: React.FC<ReservationSurveySectionProps> = ({
  profile,
  roomTypes,
  rooms,
  activeTab,
  setActiveTab,
  selectedRoomForBooking,
  selectedRoomTypeId,
  onAddReservation,
  onAddSurvey,
}) => {
  // Reservation Form State
  const [resName, setResName] = useState('');
  const [resWhatsapp, setResWhatsapp] = useState('');
  const [resRoomTypeId, setResRoomTypeId] = useState(roomTypes[0]?.id || '');
  const [resRoomNumber, setResRoomNumber] = useState('');
  const [resCheckInDate, setResCheckInDate] = useState('');
  const [resDurationMonths, setResDurationMonths] = useState(1);
  const [resOccupantType, setResOccupantType] = useState<'mahasiswa' | 'karyawan' | 'pasutri' | 'lainnya'>('karyawan');
  const [resNotes, setResNotes] = useState('');
  const [resSubmitted, setResSubmitted] = useState<ReservationRequest | null>(null);

  // Survey Form State
  const [srvName, setSrvName] = useState('');
  const [srvWhatsapp, setSrvWhatsapp] = useState('');
  const [srvDate, setSrvDate] = useState('');
  const [srvTime, setSrvTime] = useState('14:00');
  const [srvRoomTypeId, setSrvRoomTypeId] = useState(roomTypes[0]?.id || '');
  const [srvNotes, setSrvNotes] = useState('');
  const [srvSubmitted, setSrvSubmitted] = useState<SurveyRequest | null>(null);

  // Sync external selection if clicked from room matrix or showcase
  useEffect(() => {
    if (selectedRoomForBooking) {
      setResRoomTypeId(selectedRoomForBooking.typeId);
      setResRoomNumber(selectedRoomForBooking.roomNumber);
      setActiveTab('reservation');
    }
  }, [selectedRoomForBooking, setActiveTab]);

  useEffect(() => {
    if (selectedRoomTypeId) {
      setResRoomTypeId(selectedRoomTypeId);
      setSrvRoomTypeId(selectedRoomTypeId);
    }
  }, [selectedRoomTypeId]);

  // Selected Room Type Data
  const currentRoomType = roomTypes.find((t) => t.id === resRoomTypeId) || roomTypes[0];
  const availableRoomsForType = rooms.filter(
    (r) => r.typeId === resRoomTypeId && r.status === 'available'
  );

  // Calculate reservation pricing
  const baseMonthlyPrice = currentRoomType ? currentRoomType.priceMonthly : 0;
  let discountPercentage = 0;
  if (resDurationMonths >= 12) discountPercentage = 0.10; // 10% diskon 1 tahun
  else if (resDurationMonths >= 6) discountPercentage = 0.05; // 5% diskon 6 bulan

  const subtotalRent = baseMonthlyPrice * resDurationMonths;
  const discountAmount = subtotalRent * discountPercentage;
  const totalRent = subtotalRent - discountAmount;
  const deposit = profile.depositAmount || 0;
  const grandTotalEstimate = totalRent + deposit;

  // Handle Reservation Submission
  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || !resWhatsapp.trim() || !resCheckInDate) {
      alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Tanggal Check-in.');
      return;
    }

    const newReservation: ReservationRequest = {
      id: `res-${Date.now()}`,
      name: resName.trim(),
      whatsapp: resWhatsapp.trim(),
      roomTypeId: resRoomTypeId,
      roomNumber: resRoomNumber || undefined,
      checkInDate: resCheckInDate,
      durationMonths: Number(resDurationMonths),
      occupantType: resOccupantType,
      notes: resNotes.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    onAddReservation(newReservation);
    setResSubmitted(newReservation);
  };

  // Handle Survey Submission
  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName.trim() || !srvWhatsapp.trim() || !srvDate) {
      alert('Mohon lengkapi Nama, WhatsApp, dan Tanggal Rencana Survey.');
      return;
    }

    const newSurvey: SurveyRequest = {
      id: `srv-${Date.now()}`,
      name: srvName.trim(),
      whatsapp: srvWhatsapp.trim(),
      surveyDate: srvDate,
      surveyTime: srvTime,
      roomTypeId: srvRoomTypeId,
      notes: srvNotes.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    onAddSurvey(newSurvey);
    setSrvSubmitted(newSurvey);
  };

  return (
    <section id="reservasi" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Reservasi Online & Kunjungan Survey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pesan Kamar atau Jadwalkan Survey
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Pilih layanan yang Anda butuhkan. Data otomatis tersimpan ke sistem pengelola dan dapat langsung diteruskan via WhatsApp resmi.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/80 shadow-2xs">
            <button
              onClick={() => setActiveTab('reservation')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'reservation'
                  ? 'bg-white text-emerald-800 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BedDouble className="w-4 h-4" />
              <span>Formulir Booking Kamar</span>
            </button>

            <button
              onClick={() => setActiveTab('survey')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'survey'
                  ? 'bg-white text-emerald-800 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Jadwal Survey Kost</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10">
          
          {/* TAB 1: RESERVATION FORM */}
          {activeTab === 'reservation' && (
            <div>
              {resSubmitted ? (
                // Success State with direct WhatsApp link
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 sm:py-8 max-w-xl mx-auto space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Permohonan Booking Berhasil Terkirim!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Terima kasih, <strong>{resSubmitted.name}</strong>. Permohonan sewa kamar Anda telah dicatat oleh sistem pengelola {profile.name}.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs sm:text-sm text-slate-700 space-y-1.5">
                    <p><strong>Tipe Kamar:</strong> {currentRoomType?.name} {resSubmitted.roomNumber ? `(Unit #${resSubmitted.roomNumber})` : ''}</p>
                    <p><strong>Durasi Sewa:</strong> {resSubmitted.durationMonths} Bulan</p>
                    <p><strong>Rencana Check-In:</strong> {resSubmitted.checkInDate}</p>
                    <p><strong>Total Estimasi Sewa:</strong> {formatRupiah(grandTotalEstimate)} (Termasuk Deposit)</p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={createWhatsappUrl(
                        profile.whatsappNumber,
                        generateReservationWhatsappText(profile, resSubmitted, currentRoomType?.name || 'Kamar')
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Konfirmasi Langsung via WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setResSubmitted(null)}
                      className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl cursor-pointer"
                    >
                      Pesan Kamar Lainnya
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReservation} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Personal info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Nama Lengkap Calon Penghuni *
                        </label>
                        <input
                          type="text"
                          required
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          placeholder="Contoh: Rian Pratama"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Nomor WhatsApp Aktif *
                        </label>
                        <input
                          type="tel"
                          required
                          value={resWhatsapp}
                          onChange={(e) => setResWhatsapp(e.target.value)}
                          placeholder="Contoh: 081234567890"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-hidden"
                        />
                        <span className="text-[11px] text-slate-400 mt-1 block">
                          Untuk pengiriman konfirmasi & bukti kuitansi
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Kategori Pekerjaan / Aktivitas
                        </label>
                        <select
                          value={resOccupantType}
                          onChange={(e) => setResOccupantType(e.target.value as any)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white outline-hidden"
                        >
                          <option value="karyawan">Karyawan / Pekerja Profesional</option>
                          <option value="mahasiswa">Mahasiswa / Pelajar</option>
                          <option value="pasutri">Pasangan Suami-Istri (Menikah Sah)</option>
                          <option value="lainnya">Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Rencana Tanggal Masuk (Check-In) *
                        </label>
                        <input
                          type="date"
                          required
                          value={resCheckInDate}
                          onChange={(e) => setResCheckInDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Durasi Sewa
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: '1 Bln', value: 1 },
                            { label: '3 Bln', value: 3 },
                            { label: '6 Bln', value: 6, tag: 'Disc 5%' },
                            { label: '1 Thn', value: 12, tag: 'Disc 10%' },
                          ].map((dur) => (
                            <button
                              key={dur.value}
                              type="button"
                              onClick={() => setResDurationMonths(dur.value)}
                              className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center relative ${
                                resDurationMonths === dur.value
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <div>{dur.label}</div>
                              {dur.tag && (
                                <span className={`text-[9px] block ${resDurationMonths === dur.value ? 'text-emerald-100' : 'text-emerald-600 font-bold'}`}>
                                  {dur.tag}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Room choice & Price Simulation */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Pilihan Tipe Kamar
                        </label>
                        <select
                          value={resRoomTypeId}
                          onChange={(e) => {
                            setResRoomTypeId(e.target.value);
                            setResRoomNumber('');
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white outline-hidden font-semibold"
                        >
                          {roomTypes.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} - {formatRupiah(t.priceMonthly)}/bln
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Pilih Nomor Unit Kamar Tersedia (Opsional)
                        </label>
                        <select
                          value={resRoomNumber}
                          onChange={(e) => setResRoomNumber(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white outline-hidden"
                        >
                          <option value="">Pilih otomatis oleh pengelola</option>
                          {availableRoomsForType.map((r) => (
                            <option key={r.id} value={r.roomNumber}>
                              Kamar #{r.roomNumber} (Lantai {r.floor})
                            </option>
                          ))}
                        </select>
                        <span className="text-[11px] text-slate-400 mt-1 block">
                          Tersedia {availableRoomsForType.length} unit kosong untuk tipe ini
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Catatan / Kebutuhan Tambahan
                        </label>
                        <textarea
                          rows={2}
                          value={resNotes}
                          onChange={(e) => setResNotes(e.target.value)}
                          placeholder="Misal: Bawa kendaraan mobil, butuh meja kerja lebih luas, dll."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-hidden"
                        />
                      </div>

                      {/* Live Price Estimation Card */}
                      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4.5 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-slate-700">
                          <span>Sewa {currentRoomType?.name} ({resDurationMonths} Bulan)</span>
                          <span className="font-semibold">{formatRupiah(subtotalRent)}</span>
                        </div>

                        {discountPercentage > 0 && (
                          <div className="flex items-center justify-between text-emerald-700 font-semibold">
                            <span>Diskon Masa Sewa ({(discountPercentage * 100).toFixed(0)}%)</span>
                            <span>- {formatRupiah(discountAmount)}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1">
                            Deposit Jaminan (Awal Sewa)
                            <span className="text-[10px] text-slate-400">(Refundable 100%)</span>
                          </span>
                          <span className="font-semibold">{formatRupiah(deposit)}</span>
                        </div>

                        <div className="border-t border-emerald-200 pt-2 flex items-center justify-between font-bold text-slate-900 text-sm">
                          <span>Total Estimasi Awal Masuk</span>
                          <span className="text-emerald-700 text-base">{formatRupiah(grandTotalEstimate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 text-center sm:text-left">
                      ✓ Tidak ada biaya perantara. Pembayaran hanya dilakukan setelah verifikasi langsung dengan pengelola resmi.
                    </p>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer hover:scale-[1.01]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Permohonan Booking</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: SURVEY FORM */}
          {activeTab === 'survey' && (
            <div>
              {srvSubmitted ? (
                // Survey Success
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 sm:py-8 max-w-xl mx-auto space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Jadwal Survey Berhasil Didaftarkan!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Halo <strong>{srvSubmitted.name}</strong>, jadwal kunjungan survey Anda pada <strong>{srvSubmitted.surveyDate} pukul {srvSubmitted.surveyTime} WIB</strong> telah dicatat.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs sm:text-sm text-slate-700 space-y-1.5">
                    <p><strong>Minat Kamar:</strong> {roomTypes.find((t) => t.id === srvSubmitted.roomTypeId)?.name || 'Semua Tipe'}</p>
                    <p><strong>Lokasi Kost:</strong> {profile.address}</p>
                    <p><strong>Catatan:</strong> {srvSubmitted.notes || '-'}</p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={createWhatsappUrl(
                        profile.whatsappNumber,
                        generateSurveyWhatsappText(
                          profile,
                          srvSubmitted,
                          roomTypes.find((t) => t.id === srvSubmitted.roomTypeId)?.name || 'Kamar Kost'
                        )
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Kirim Jadwal ke WhatsApp Pengelola</span>
                    </a>

                    <button
                      onClick={() => setSrvSubmitted(null)}
                      className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl cursor-pointer"
                    >
                      Jadwalkan Survey Lain
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitSurvey} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Nama Anda *
                        </label>
                        <input
                          type="text"
                          required
                          value={srvName}
                          onChange={(e) => setSrvName(e.target.value)}
                          placeholder="Nama lengkap Anda"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Nomor WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={srvWhatsapp}
                          onChange={(e) => setSrvWhatsapp(e.target.value)}
                          placeholder="081234567890"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Tipe Kamar yang Ingin Dilihat
                        </label>
                        <select
                          value={srvRoomTypeId}
                          onChange={(e) => setSrvRoomTypeId(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white outline-hidden font-medium"
                        >
                          {roomTypes.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} ({t.size})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Rencana Tanggal Survey *
                        </label>
                        <input
                          type="date"
                          required
                          value={srvDate}
                          onChange={(e) => setSrvDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Perkiraan Jam Kedatangan (WIB)
                        </label>
                        <select
                          value={srvTime}
                          onChange={(e) => setSrvTime(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white outline-hidden"
                        >
                          <option value="09:00">Pagi (09:00 WIB)</option>
                          <option value="11:00">Menjelang Siang (11:00 WIB)</option>
                          <option value="14:00">Siang Hari (14:00 WIB)</option>
                          <option value="16:00">Sore Hari (16:00 WIB)</option>
                          <option value="19:00">Malam Hari (19:00 WIB)</option>
                        </select>
                        <span className="text-[11px] text-slate-400 mt-1 block">
                          Jam operasional kantor pengelola: {profile.operationalHours}
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Catatan / Pertanyaan Awal
                        </label>
                        <textarea
                          rows={2}
                          value={srvNotes}
                          onChange={(e) => setSrvNotes(e.target.value)}
                          placeholder="Misal: Ingin cek sinyal WiFi dan lihat parkiran mobil"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 text-center sm:text-left">
                      ✓ Survey lokasi 100% Gratis & tanpa komitmen apapun. Staf kami siap mendampingi Anda.
                    </p>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer hover:scale-[1.01]"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Jadwalkan Survey Sekarang</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
