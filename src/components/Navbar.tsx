import React, { useState } from 'react';
import { Home, Menu, X, Lock, Unlock, PhoneCall, Calendar, BedDouble } from 'lucide-react';
import { KostProfile } from '../types';

interface NavbarProps {
  profile: KostProfile;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
  onSelectActionTab: (tab: 'reservation' | 'survey') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  onSelectActionTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Kamar & Harga', href: '#kamar' },
    { label: 'Ketersediaan', href: '#ketersediaan' },
    { label: 'Fasilitas', href: '#fasilitas' },
    { label: 'Aturan Kost', href: '#aturan' },
    { label: 'Lokasi & Akses', href: '#lokasi' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    onSelectActionTab('reservation');
    const el = document.querySelector('#reservasi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSurveyClick = () => {
    setMobileMenuOpen(false);
    onSelectActionTab('survey');
    const el = document.querySelector('#reservasi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-hidden"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                  {profile.name}
                </span>
                <span className="inline-flex items-center text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  Kost {profile.genderType}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs mt-0.5">
                {profile.city}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors relative py-1 hover:underline underline-offset-8 decoration-2 decoration-emerald-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Admin Switch */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleSurveyClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200/80 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Jadwal Survey</span>
            </button>

            <button
              onClick={handleBookClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-600/30 transition-all hover:shadow-md cursor-pointer active:scale-95"
            >
              <BedDouble className="w-3.5 h-3.5" />
              <span>Pesan Kamar</span>
            </button>

            {/* Admin Dashboard / Login Button */}
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg border border-emerald-300 transition-colors cursor-pointer"
                title="Buka Dashboard Admin"
              >
                <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Panel Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Masuk sebagai Pengelola / Admin"
                aria-label="Login Admin"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="p-2 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-lg border border-emerald-300"
                title="Dashboard Admin"
              >
                <Unlock className="w-4 h-4 text-emerald-700" />
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-lg"
                title="Login Admin"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-150">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={handleSurveyClick}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
              >
                <Calendar className="w-4 h-4" />
                Jadwal Survey
              </button>
              <button
                onClick={handleBookClick}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg"
              >
                <BedDouble className="w-4 h-4" />
                Pesan Kamar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
