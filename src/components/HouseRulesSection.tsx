import React from 'react';
import { motion } from 'motion/react';
import { HouseRule } from '../types';
import { ShieldCheck, Users, Sparkles, Moon, AlertCircle } from 'lucide-react';

interface HouseRulesSectionProps {
  rules: HouseRule[];
}

export const HouseRulesSection: React.FC<HouseRulesSectionProps> = ({ rules }) => {
  return (
    <section id="aturan" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kenyamanan & Privasi Bersama</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tata Tertib & Aturan Kost
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Kami menjaga lingkungan kost tetap tenang, kondusif, aman, dan menghargai privasi setiap penghuni melalui aturan yang jelas dan ditegakkan.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, idx) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                    Aturan #{idx + 1}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 capitalize">
                    Kategori: {rule.category}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {rule.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rule.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Wajib ditaati seluruh penghuni & tamu</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note below */}
        <div className="mt-10 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3 max-w-3xl mx-auto">
          <Moon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Jam Tenang Kost:</strong> Berlaku mulai pukul 22.00 hingga 06.00 WIB. Gerbang utama tetap dapat diakses 24 jam dengan kartu akses smart lock untuk penghuni yang bekerja shift malam atau lembur.
          </p>
        </div>

      </div>
    </section>
  );
};
