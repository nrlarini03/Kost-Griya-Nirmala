import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare, Search } from 'lucide-react';
import { FaqItem, KostProfile } from '../types';
import { createWhatsappUrl } from '../utils/helpers';

interface FaqSectionProps {
  faqs: FaqItem[];
  profile: KostProfile;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, profile }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pertanyaan Populer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Jawaban lengkap seputar sistem pembayaran, fasilitas, aturan, dan kunjungan survey kost.
          </p>
        </div>

        {/* Search Filter */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari pertanyaan... (misal: listrik, deposit, survey)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden shadow-2xs"
          />
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition-all shadow-2xs hover:border-slate-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 mt-1">
                          <p className="pt-3">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
              <p className="text-sm">Tidak menemukan pertanyaan yang cocok dengan "{searchTerm}".</p>
            </div>
          )}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <p className="text-sm font-bold text-slate-900 mb-1">Masih memiliki pertanyaan lain?</p>
          <p className="text-xs text-slate-500 mb-4">
            Pengelola kami selalu siap memberikan informasi ramah dan detail melalui WhatsApp.
          </p>
          <a
            href={createWhatsappUrl(
              profile.whatsappNumber,
              `Halo Pengelola ${profile.name}, saya memiliki pertanyaan tambahan mengenai kost...`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Tanya Jawab via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
