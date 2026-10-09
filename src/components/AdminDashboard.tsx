import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  BedDouble,
  Sliders,
  Inbox,
  Building,
  ListChecks,
  KeyRound,
  LogOut,
  Eye,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  Save,
  RotateCcw,
  Download,
  Upload,
  AlertTriangle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import {
  AppStateData,
  RoomUnit,
  RoomType,
  ReservationRequest,
  SurveyRequest,
  FacilityItem,
  HouseRule,
  FaqItem,
  KostProfile
} from '../types';
import { formatRupiah, formatDateIndo, createWhatsappUrl } from '../utils/helpers';
import { INITIAL_DATA } from '../data/initialData';

interface AdminDashboardProps {
  data: AppStateData;
  onUpdateData: (newData: AppStateData) => void;
  onCloseDashboard: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data,
  onUpdateData,
  onCloseDashboard,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'rooms' | 'types' | 'leads' | 'profile' | 'content' | 'settings'
  >('overview');

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Quick Stats
  const totalRooms = data.rooms.length;
  const availableRooms = data.rooms.filter((r) => r.status === 'available').length;
  const occupiedRooms = data.rooms.filter((r) => r.status === 'occupied').length;
  const bookedRooms = data.rooms.filter((r) => r.status === 'booked').length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const pendingReservations = data.reservations.filter((r) => r.status === 'pending').length;
  const pendingSurveys = data.surveys.filter((s) => s.status === 'pending').length;

  // Estimated monthly revenue from occupied rooms
  const monthlyRevenue = data.rooms.reduce((acc, room) => {
    if (room.status === 'occupied') {
      const type = data.roomTypes.find((t) => t.id === room.typeId);
      return acc + (type ? type.priceMonthly : 0);
    }
    return acc;
  }, 0);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<KostProfile>({ ...data.profile });

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Room modal / editing
  const [editingRoom, setEditingRoom] = useState<RoomUnit | null>(null);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomFloor, setNewRoomFloor] = useState(1);
  const [newRoomTypeId, setNewRoomTypeId] = useState(data.roomTypes[0]?.id || '');
  const [newRoomStatus, setNewRoomStatus] = useState<RoomUnit['status']>('available');
  const [newRoomOccupant, setNewRoomOccupant] = useState('');

  // Handle Room Status toggle directly in table
  const handleToggleRoomStatus = (roomId: string, newStatus: RoomUnit['status']) => {
    const updatedRooms = data.rooms.map((r) =>
      r.id === roomId
        ? {
            ...r,
            status: newStatus,
            occupantName: newStatus === 'available' ? '' : r.occupantName,
          }
        : r
    );
    const updated = { ...data, rooms: updatedRooms };
    onUpdateData(updated);
    showToast('Status kamar berhasil diperbarui!');
  };

  // Handle Delete Room
  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm('Yakin ingin menghapus unit kamar ini?')) {
      const updatedRooms = data.rooms.filter((r) => r.id !== roomId);
      onUpdateData({ ...data, rooms: updatedRooms });
      showToast('Kamar berhasil dihapus.');
    }
  };

  // Handle Add Room
  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomNumber.trim()) return;

    if (data.rooms.some((r) => r.roomNumber === newRoomNumber.trim())) {
      alert(`Nomor kamar ${newRoomNumber} sudah digunakan! Gunakan nomor lain.`);
      return;
    }

    const newRoom: RoomUnit = {
      id: `rm-${Date.now()}`,
      roomNumber: newRoomNumber.trim(),
      floor: Number(newRoomFloor),
      typeId: newRoomTypeId,
      status: newRoomStatus,
      occupantName: newRoomOccupant.trim() || undefined,
    };

    onUpdateData({
      ...data,
      rooms: [...data.rooms, newRoom].sort((a, b) => a.roomNumber.localeCompare(b.roomNumber)),
    });
    setNewRoomNumber('');
    setNewRoomOccupant('');
    showToast(`Kamar #${newRoom.roomNumber} berhasil ditambahkan!`);
  };

  // Handle Update Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateData({ ...data, profile: profileForm });
    showToast('Profil dan informasi kost berhasil disimpan!');
  };

  // Handle Lead Status Updates
  const handleUpdateReservationStatus = (id: string, status: ReservationRequest['status']) => {
    const updated = data.reservations.map((r) => (r.id === id ? { ...r, status } : r));
    onUpdateData({ ...data, reservations: updated });
    showToast('Status reservasi diperbarui.');
  };

  const handleDeleteReservation = (id: string) => {
    if (window.confirm('Hapus data reservasi ini?')) {
      const updated = data.reservations.filter((r) => r.id !== id);
      onUpdateData({ ...data, reservations: updated });
      showToast('Data reservasi dihapus.');
    }
  };

  const handleUpdateSurveyStatus = (id: string, status: SurveyRequest['status']) => {
    const updated = data.surveys.map((s) => (s.id === id ? { ...s, status } : s));
    onUpdateData({ ...data, surveys: updated });
    showToast('Status survey diperbarui.');
  };

  const handleDeleteSurvey = (id: string) => {
    if (window.confirm('Hapus data jadwal survey ini?')) {
      const updated = data.surveys.filter((s) => s.id !== id);
      onUpdateData({ ...data, surveys: updated });
      showToast('Data survey dihapus.');
    }
  };

  // Handle Change Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      alert('Password baru tidak boleh kosong.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Konfirmasi password tidak cocok!');
      return;
    }
    onUpdateData({ ...data, adminPasswordHash: newPassword.trim() });
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password admin berhasil diubah!');
  };

  // Export JSON Backup
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kost_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Cadangan data berhasil diunduh!');
  };

  // Import JSON Backup
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.profile && parsed.rooms && parsed.roomTypes) {
            onUpdateData(parsed);
            showToast('Data berhasil dipulihkan dari file backup!');
          } else {
            alert('Format file backup tidak valid.');
          }
        } catch {
          alert('Gagal membaca file JSON.');
        }
      };
    }
  };

  // Reset to default data
  const handleResetToDefault = () => {
    if (
      window.confirm(
        'PERINGATAN: Apakah Anda yakin ingin mereset seluruh data kembali ke data contoh bawaan?'
      )
    ) {
      onUpdateData(INITIAL_DATA);
      setProfileForm(INITIAL_DATA.profile);
      showToast('Data dikembalikan ke pengaturan default.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">
                Panel Pengelola Kost
              </h1>
              <p className="text-[11px] text-slate-500">{data.profile.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onCloseDashboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lihat Halaman Tamu</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer border border-rose-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto py-1 scrollbar-none border-t border-slate-100 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
            { id: 'rooms', label: `Kelola Kamar (${totalRooms})`, icon: BedDouble },
            { id: 'types', label: `Tipe & Harga (${data.roomTypes.length})`, icon: Sliders },
            {
              id: 'leads',
              label: `Reservasi & Survey (${pendingReservations + pendingSurveys})`,
              icon: Inbox,
              badge: pendingReservations + pendingSurveys > 0,
            },
            { id: 'profile', label: 'Profil & Kontak', icon: Building },
            { id: 'content', label: 'Fasilitas, Aturan, FAQ', icon: ListChecks },
            { id: 'settings', label: 'Pengaturan & Backup', icon: KeyRound },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-slate-500 uppercase">Kamar Kosong / Siap Huni</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-3xl font-extrabold text-emerald-700">{availableRooms}</span>
                  <span className="text-xs text-slate-400">dari {totalRooms} unit</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${totalRooms ? (availableRooms / totalRooms) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-slate-500 uppercase">Tingkat Keterisian</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-3xl font-extrabold text-slate-900">{occupancyRate}%</span>
                  <span className="text-xs text-slate-400">{occupiedRooms} unit terisi</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-slate-800 h-full rounded-full"
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-slate-500 uppercase">Estimasi Omset Bulanan</span>
                <div className="mt-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {formatRupiah(monthlyRevenue)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Berdasarkan unit yang aktif terisi</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-slate-500 uppercase">Permintaan Baru</span>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-3xl font-extrabold text-amber-600">
                    {pendingReservations + pendingSurveys}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({pendingReservations} booking, {pendingSurveys} survey)
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs text-emerald-700 font-bold hover:underline mt-2 inline-block cursor-pointer"
                >
                  Tinjau data pendaftar →
                </button>
              </div>
            </div>

            {/* Quick Room Units Matrix in Overview */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Status Seluruh Unit Kamar</h3>
                  <p className="text-xs text-slate-500">Klik status tombol untuk ubah cepat status kamar</p>
                </div>
                <button
                  onClick={() => setActiveTab('rooms')}
                  className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Kelola Detail Unit →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {data.rooms.map((rm) => {
                  const type = data.roomTypes.find((t) => t.id === rm.typeId);
                  return (
                    <div
                      key={rm.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-slate-900 text-sm">#{rm.roomNumber}</span>
                        <span className="text-[10px] text-slate-400">Lt. {rm.floor}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mb-2">{type?.name}</p>
                      
                      <select
                        value={rm.status}
                        onChange={(e) => handleToggleRoomStatus(rm.id, e.target.value as any)}
                        className={`text-[11px] font-bold py-1 px-2 rounded-lg border outline-hidden cursor-pointer ${
                          rm.status === 'available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : rm.status === 'booked'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-slate-200 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="available">Tersedia (Kosong)</option>
                        <option value="occupied">Terisi (Penghuni)</option>
                        <option value="booked">Booked (Tertahan)</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Reservations */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-3">Reservasi Terbaru Masuk</h3>
                {data.reservations.length > 0 ? (
                  <div className="space-y-3">
                    {data.reservations.slice(0, 3).map((r) => (
                      <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{r.name}</p>
                          <p className="text-[11px] text-slate-500">
                            Check-in: {r.checkInDate} · {r.durationMonths} Bulan
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          r.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {r.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Belum ada reservasi masuk.</p>
                )}
              </div>

              {/* Recent Survey */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-3">Jadwal Survey Terbaru</h3>
                {data.surveys.length > 0 ? (
                  <div className="space-y-3">
                    {data.surveys.slice(0, 3).map((s) => (
                      <div key={s.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{s.name}</p>
                          <p className="text-[11px] text-slate-500">
                            Tanggal: {s.surveyDate} pukul {s.surveyTime} WIB
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Belum ada jadwal survey masuk.</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ROOMS MANAGEMENT */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            {/* Add Room Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                Tambah Unit Kamar Baru
              </h3>
              <form onSubmit={handleAddRoom} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">No. Kamar *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 301"
                    value={newRoomNumber}
                    onChange={(e) => setNewRoomNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Lantai *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newRoomFloor}
                    onChange={(e) => setNewRoomFloor(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Tipe Kamar</label>
                  <select
                    value={newRoomTypeId}
                    onChange={(e) => setNewRoomTypeId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-hidden bg-white"
                  >
                    {data.roomTypes.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Status Awal</label>
                  <select
                    value={newRoomStatus}
                    onChange={(e) => setNewRoomStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-hidden bg-white"
                  >
                    <option value="available">Tersedia (Kosong)</option>
                    <option value="occupied">Terisi</option>
                    <option value="booked">Booked</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Penghuni (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Nama penghuni"
                    value={newRoomOccupant}
                    onChange={(e) => setNewRoomOccupant(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs"
                  >
                    + Simpan Kamar
                  </button>
                </div>
              </form>
            </div>

            {/* Room List Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Daftar Lengkap Kamar ({data.rooms.length})</h3>
                  <p className="text-xs text-slate-500">Ubah status, nama penghuni, atau hapus unit kamar.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">No. Kamar</th>
                      <th className="py-3 px-4">Lantai</th>
                      <th className="py-3 px-4">Tipe Kamar</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Nama Penghuni</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {data.rooms.map((rm) => {
                      const type = data.roomTypes.find((t) => t.id === rm.typeId);
                      return (
                        <tr key={rm.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-black text-slate-900 text-sm">#{rm.roomNumber}</td>
                          <td className="py-3 px-4">Lantai {rm.floor}</td>
                          <td className="py-3 px-4 font-medium">{type?.name || rm.typeId}</td>
                          <td className="py-3 px-4">
                            <select
                              value={rm.status}
                              onChange={(e) => handleToggleRoomStatus(rm.id, e.target.value as any)}
                              className={`py-1 px-2.5 rounded-lg border text-xs font-bold outline-hidden cursor-pointer ${
                                rm.status === 'available'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : rm.status === 'booked'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-slate-100 text-slate-700 border-slate-300'
                              }`}
                            >
                              <option value="available">Tersedia</option>
                              <option value="occupied">Terisi</option>
                              <option value="booked">Booked</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              value={rm.occupantName || ''}
                              placeholder="Belum ada penghuni"
                              onChange={(e) => {
                                const val = e.target.value;
                                const updated = data.rooms.map((r) =>
                                  r.id === rm.id ? { ...r, occupantName: val } : r
                                );
                                onUpdateData({ ...data, rooms: updated });
                              }}
                              className="px-2 py-1 rounded-md border border-slate-200 text-xs w-36 outline-hidden focus:border-emerald-500"
                            />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteRoom(rm.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Kamar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ROOM TYPES & PRICING */}
        {activeTab === 'types' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Pengaturan Tipe Kamar & Tarif Sewa</h3>
              <p className="text-xs text-slate-500 mb-6">
                Ubah tarif sewa bulanan, harian, atau spesifikasi tipe kamar langsung di sini.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.roomTypes.map((type, idx) => (
                  <div key={type.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-base">{type.name}</h4>
                      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={type.isPopular || false}
                          onChange={(e) => {
                            const updated = data.roomTypes.map((t) =>
                              t.id === type.id ? { ...t, isPopular: e.target.checked } : t
                            );
                            onUpdateData({ ...data, roomTypes: updated });
                            showToast(`Label terpopuler untuk ${type.name} diperbarui.`);
                          }}
                          className="rounded text-emerald-600"
                        />
                        Badge Favorit
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Tarif Bulanan (IDR)
                      </label>
                      <input
                        type="number"
                        value={type.priceMonthly}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = data.roomTypes.map((t) =>
                            t.id === type.id ? { ...t, priceMonthly: val } : t
                          );
                          onUpdateData({ ...data, roomTypes: updated });
                        }}
                        className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Ukuran Kamar
                      </label>
                      <input
                        type="text"
                        value={type.size}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updated = data.roomTypes.map((t) =>
                            t.id === type.id ? { ...t, size: val } : t
                          );
                          onUpdateData({ ...data, roomTypes: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Tipe Ranjang
                      </label>
                      <input
                        type="text"
                        value={type.bedType}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updated = data.roomTypes.map((t) =>
                            t.id === type.id ? { ...t, bedType: val } : t
                          );
                          onUpdateData({ ...data, roomTypes: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        URL Foto Utama
                      </label>
                      <input
                        type="text"
                        value={type.images[0] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updated = data.roomTypes.map((t) =>
                            t.id === type.id
                              ? { ...t, images: [val, ...(t.images.slice(1))] }
                              : t
                          );
                          onUpdateData({ ...data, roomTypes: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white truncate"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Deskripsi Singkat
                      </label>
                      <textarea
                        rows={2}
                        value={type.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updated = data.roomTypes.map((t) =>
                            t.id === type.id ? { ...t, description: val } : t
                          );
                          onUpdateData({ ...data, roomTypes: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEADS (RESERVATIONS & SURVEYS) */}
        {activeTab === 'leads' && (
          <div className="space-y-8">
            {/* Reservations Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Permohonan Reservasi Kamar Masuk ({data.reservations.length})</h3>
                  <p className="text-xs text-slate-500">Hubungi langsung via WhatsApp atau ubah status reservasi.</p>
                </div>
              </div>

              {data.reservations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Nama & Kontak</th>
                        <th className="py-3 px-4">Tipe & Unit</th>
                        <th className="py-3 px-4">Rencana Masuk</th>
                        <th className="py-3 px-4">Durasi</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.reservations.map((res) => {
                        const type = data.roomTypes.find((t) => t.id === res.roomTypeId);
                        return (
                          <tr key={res.id} className="hover:bg-slate-50/70">
                            <td className="py-3 px-4">
                              <p className="font-bold text-slate-900">{res.name}</p>
                              <a
                                href={createWhatsappUrl(res.whatsapp, `Halo Kak ${res.name}, saya pengelola ${data.profile.name} perihal permohonan booking kamar...`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-700 font-semibold inline-flex items-center gap-1 hover:underline mt-0.5"
                              >
                                <MessageSquare className="w-3 h-3" />
                                {res.whatsapp}
                              </a>
                              {res.notes && (
                                <p className="text-[10px] text-slate-500 italic mt-0.5">"{res.notes}"</p>
                              )}
                            </td>
                            <td className="py-3 px-4 font-medium">
                              {type?.name} {res.roomNumber ? `(#${res.roomNumber})` : ''}
                            </td>
                            <td className="py-3 px-4">{res.checkInDate}</td>
                            <td className="py-3 px-4">{res.durationMonths} Bulan</td>
                            <td className="py-3 px-4">
                              <select
                                value={res.status}
                                onChange={(e) => handleUpdateReservationStatus(res.id, e.target.value as any)}
                                className={`text-[11px] font-bold py-1 px-2 rounded-lg border outline-hidden cursor-pointer ${
                                  res.status === 'confirmed'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : res.status === 'cancelled'
                                    ? 'bg-rose-50 text-rose-800 border-rose-300'
                                    : 'bg-amber-50 text-amber-800 border-amber-300'
                                }`}
                              >
                                <option value="pending">Menunggu</option>
                                <option value="confirmed">Disetujui</option>
                                <option value="cancelled">Batal</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleDeleteReservation(res.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">Belum ada reservasi masuk.</div>
              )}
            </div>

            {/* Surveys Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Jadwal Survey Masuk ({data.surveys.length})</h3>
                  <p className="text-xs text-slate-500">Daftar calon penghuni yang meminta survey lokasi fisik.</p>
                </div>
              </div>

              {data.surveys.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Nama & WhatsApp</th>
                        <th className="py-3 px-4">Tanggal & Jam Survey</th>
                        <th className="py-3 px-4">Minat Tipe Kamar</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.surveys.map((srv) => {
                        const type = data.roomTypes.find((t) => t.id === srv.roomTypeId);
                        return (
                          <tr key={srv.id} className="hover:bg-slate-50/70">
                            <td className="py-3 px-4">
                              <p className="font-bold text-slate-900">{srv.name}</p>
                              <a
                                href={createWhatsappUrl(srv.whatsapp, `Halo Kak ${srv.name}, mengenai jadwal survey kost di ${data.profile.name} pada ${srv.surveyDate}...`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-700 font-semibold inline-flex items-center gap-1 hover:underline mt-0.5"
                              >
                                <MessageSquare className="w-3 h-3" />
                                {srv.whatsapp}
                              </a>
                            </td>
                            <td className="py-3 px-4">
                              {srv.surveyDate} pukul {srv.surveyTime} WIB
                            </td>
                            <td className="py-3 px-4">{type?.name || 'Semua Tipe'}</td>
                            <td className="py-3 px-4">
                              <select
                                value={srv.status}
                                onChange={(e) => handleUpdateSurveyStatus(srv.id, e.target.value as any)}
                                className={`text-[11px] font-bold py-1 px-2 rounded-lg border outline-hidden cursor-pointer ${
                                  srv.status === 'confirmed'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : srv.status === 'completed'
                                    ? 'bg-slate-100 text-slate-800 border-slate-300'
                                    : srv.status === 'cancelled'
                                    ? 'bg-rose-50 text-rose-800 border-rose-300'
                                    : 'bg-amber-50 text-amber-800 border-amber-300'
                                }`}
                              >
                                <option value="pending">Menunggu</option>
                                <option value="confirmed">Dijadwalkan</option>
                                <option value="completed">Selesai Survey</option>
                                <option value="cancelled">Batal</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleDeleteSurvey(srv.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">Belum ada jadwal survey masuk.</div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE & CONTACT MANAGEMENT */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-4xl mx-auto">
            <h3 className="font-bold text-slate-900 text-base mb-1">Pengaturan Informasi & Profil Kost</h3>
            <p className="text-xs text-slate-500 mb-6">Informasi ini langsung ditampilkan pada landing page publik.</p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Kost *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Penghuni Kost *</label>
                  <select
                    value={profileForm.genderType}
                    onChange={(e) => setProfileForm({ ...profileForm, genderType: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="Campur">Kost Campur</option>
                    <option value="Putri">Kost Putri (Khusus Wanita)</option>
                    <option value="Putra">Kost Putra (Khusus Pria)</option>
                    <option value="Pasutri">Kost Pasutri / Keluarga</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Utama *</label>
                <input
                  type="text"
                  required
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bio / Deskripsi Singkat *</label>
                <textarea
                  rows={3}
                  required
                  value={profileForm.shortBio}
                  onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp Pengelola *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.whatsappNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Format: 6281234567890</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Telepon Kantor</label>
                  <input
                    type="text"
                    value={profileForm.phoneNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, phoneNumber: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Pengelola</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jam Operasional Layanan</label>
                  <input
                    type="text"
                    value={profileForm.operationalHours}
                    onChange={(e) => setProfileForm({ ...profileForm, operationalHours: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap Kost *</label>
                <input
                  type="text"
                  required
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Google Maps Iframe Embed</label>
                <input
                  type="text"
                  value={profileForm.googleMapsEmbed}
                  onChange={(e) => setProfileForm({ ...profileForm, googleMapsEmbed: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs truncate"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Foto Hero Banner (URL)</label>
                <input
                  type="text"
                  value={profileForm.heroImage}
                  onChange={(e) => setProfileForm({ ...profileForm, heroImage: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs truncate"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Profil</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 6: FACILITIES, RULES, AND FAQ */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            {/* Facilities editor */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Daftar Fasilitas Kost ({data.facilities.length})</h3>
                  <p className="text-xs text-slate-500">Fasilitas yang ditampilkan pada landing page.</p>
                </div>
                <button
                  onClick={() => {
                    const newName = prompt('Nama fasilitas baru:');
                    if (!newName) return;
                    const newDesc = prompt('Keterangan fasilitas:') || '';
                    const newCat = prompt('Kategori (kamar / bersama / keamanan / parkir):') || 'kamar';
                    const newFac: FacilityItem = {
                      id: `fac-${Date.now()}`,
                      name: newName,
                      description: newDesc,
                      category: newCat as any,
                      iconName: 'CheckCircle2',
                    };
                    onUpdateData({ ...data, facilities: [...data.facilities, newFac] });
                    showToast('Fasilitas ditambahkan.');
                  }}
                  className="text-xs font-bold px-3 py-1.5 bg-emerald-600 text-white rounded-lg cursor-pointer"
                >
                  + Tambah Fasilitas
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.facilities.map((fac) => (
                  <div key={fac.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between">
                    <div>
                      <p className="font-bold text-xs text-slate-900">{fac.name}</p>
                      <span className="text-[10px] text-slate-400 capitalize">{fac.category}</span>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{fac.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus fasilitas "${fac.name}"?`)) {
                          onUpdateData({
                            ...data,
                            facilities: data.facilities.filter((f) => f.id !== fac.id),
                          });
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules editor */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Tata Tertib & Aturan Kost ({data.rules.length})</h3>
                  <p className="text-xs text-slate-500">Peraturan yang berlaku untuk seluruh penghuni.</p>
                </div>
                <button
                  onClick={() => {
                    const title = prompt('Judul aturan baru:');
                    if (!title) return;
                    const desc = prompt('Penjelasan aturan:') || '';
                    const newRule: HouseRule = {
                      id: `rule-${Date.now()}`,
                      title,
                      description: desc,
                      category: 'umum',
                    };
                    onUpdateData({ ...data, rules: [...data.rules, newRule] });
                    showToast('Aturan berhasil ditambahkan.');
                  }}
                  className="text-xs font-bold px-3 py-1.5 bg-emerald-600 text-white rounded-lg cursor-pointer"
                >
                  + Tambah Aturan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.rules.map((rule) => (
                  <div key={rule.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between">
                    <div>
                      <p className="font-bold text-xs text-slate-900">{rule.title}</p>
                      <p className="text-[11px] text-slate-600 mt-1">{rule.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus aturan "${rule.title}"?`)) {
                          onUpdateData({
                            ...data,
                            rules: data.rules.filter((r) => r.id !== rule.id),
                          });
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ editor */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Tanya Jawab FAQ ({data.faqs.length})</h3>
                  <p className="text-xs text-slate-500">Pertanyaan umum dan jawabannya di halaman depan.</p>
                </div>
                <button
                  onClick={() => {
                    const q = prompt('Pertanyaan baru:');
                    if (!q) return;
                    const a = prompt('Jawaban:') || '';
                    const newFaq: FaqItem = {
                      id: `faq-${Date.now()}`,
                      question: q,
                      answer: a,
                      category: 'Umum',
                    };
                    onUpdateData({ ...data, faqs: [...data.faqs, newFaq] });
                    showToast('FAQ ditambahkan.');
                  }}
                  className="text-xs font-bold px-3 py-1.5 bg-emerald-600 text-white rounded-lg cursor-pointer"
                >
                  + Tambah FAQ
                </button>
              </div>

              <div className="space-y-3">
                {data.faqs.map((faq) => (
                  <div key={faq.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-bold text-xs text-slate-900">Q: {faq.question}</p>
                      <p className="text-[11px] text-slate-600">A: {faq.answer}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus FAQ ini?`)) {
                          onUpdateData({
                            ...data,
                            faqs: data.faqs.filter((f) => f.id !== faq.id),
                          });
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS, PASSWORD & BACKUP */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Change Password Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-600" />
                Ubah Password Admin
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Ganti password yang digunakan untuk mengakses dashboard pengelola ini.
              </p>

              <form onSubmit={handleChangePassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Password Baru</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Masukkan password baru"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Ulangi Password Baru</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ketik ulang password baru"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Simpan Password Baru
                </button>
              </form>
            </div>

            {/* Backup & Restore Data */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Cadangan & Pemulihan Data (JSON)</h3>
              <p className="text-xs text-slate-500">
                Unduh seluruh data kost, ketersediaan kamar, dan pendaftar ke file JSON di komputer Anda untuk cadangan aman.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportData}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>

                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-all border border-slate-300">
                  <Upload className="w-4 h-4" />
                  <span>Restore dari File JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Reset to Factory Defaults */}
            <div className="bg-rose-50/70 border border-rose-200 p-6 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Zona Bahaya: Reset Data</span>
              </div>
              <p className="text-xs text-rose-700">
                Mengembalikan seluruh data unit kamar, tarif, fasilitas, dan password ke kondisi awal bawaan aplikasi.
              </p>
              <button
                onClick={handleResetToDefault}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Data Bawaan</span>
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
