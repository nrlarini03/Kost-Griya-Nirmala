import React from 'react';
import { Home, Phone, Mail, Clock, MapPin, Lock, Unlock, ShieldCheck, Heart } from 'lucide-react';
import { KostProfile } from '../types';

interface FooterSectionProps {
  profile: KostProfile;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  profile,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onOpenAdminDashboard,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center font-bold">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                {profile.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {profile.shortBio}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                Terpercaya & Legal
              </span>
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                Kost {profile.genderType}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#kamar" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Tipe Kamar & Harga
                </a>
              </li>
              <li>
                <a href="#ketersediaan" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Cek Ketersediaan Kamar
                </a>
              </li>
              <li>
                <a href="#fasilitas" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Fasilitas Kamar & Bersama
                </a>
              </li>
              <li>
                <a href="#aturan" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Tata Tertib Kost
                </a>
              </li>
              <li>
                <a href="#lokasi" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Lokasi & Akses Sekitar
                </a>
              </li>
              <li>
                <a href="#reservasi" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Booking & Jadwal Survey
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Kontak Resmi Pengelola
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{profile.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>WhatsApp: {profile.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Layanan: {profile.operationalHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {profile.name}. Seluruh Hak Cipta Dilindungi.</p>

          <div className="flex items-center gap-4">
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 text-emerald-300 hover:bg-emerald-900 border border-emerald-700 font-semibold cursor-pointer transition-colors"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Panel Pengelola (Aktif)</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Masuk Dashboard Pengelola</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
