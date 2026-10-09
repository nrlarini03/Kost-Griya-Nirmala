import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, BedDouble, Calendar, Sparkles } from 'lucide-react';
import { KostProfile } from '../types';
import { createWhatsappUrl } from '../utils/helpers';

interface FloatingWhatsAppProps {
  profile: KostProfile;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    {
      title: 'Tanya Ketersediaan Kamar',
      desc: 'Cek kamar yang masih kosong saat ini',
      text: `Halo Admin ${profile.name}, saya ingin menanyakan ketersediaan kamar kost yang masih kosong untuk bulan ini.`,
      icon: <BedDouble className="w-4 h-4 text-emerald-600" />,
    },
    {
      title: 'Jadwalkan Survey Lokasi',
      desc: 'Ingin lihat kamar langsung hari ini/besok',
      text: `Halo Admin ${profile.name}, saya ingin membuat janji untuk survey langsung ke lokasi kost. Apakah bisa dibantu?`,
      icon: <Calendar className="w-4 h-4 text-emerald-600" />,
    },
    {
      title: 'Tanya Info Harga & Fasilitas',
      desc: 'Konsultasi seputar fasilitas & aturan',
      text: `Halo Admin ${profile.name}, saya tertarik dengan kost ini. Boleh minta info detail mengenai harga dan fasilitasnya?`,
      icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">{profile.name}</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Pengelola Online via WhatsApp
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick choices body */}
          <div className="p-3.5 space-y-2 bg-slate-50 max-h-80 overflow-y-auto">
            <p className="text-xs text-slate-500 font-medium px-1">
              Pilih pesan cepat untuk langsung terhubung:
            </p>

            {quickMessages.map((item, idx) => (
              <a
                key={idx}
                href={createWhatsappUrl(profile.whatsappNumber, item.text)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-xs transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all shrink-0" />
              </a>
            ))}
          </div>

          {/* Direct CTA */}
          <div className="p-3 bg-white border-t border-slate-100 text-center">
            <a
              href={createWhatsappUrl(profile.whatsappNumber, `Halo Admin ${profile.name}...`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Buka Chat Langsung di WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-700/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer relative group"
        aria-label="Hubungi WhatsApp Pengelola Kost"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>
    </div>
  );
};
