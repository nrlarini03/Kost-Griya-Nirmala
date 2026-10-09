/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppStateData, ReservationRequest, SurveyRequest, RoomUnit } from './types';
import { loadStoredData, saveStoredData } from './utils/helpers';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AvailabilitySection } from './components/AvailabilitySection';
import { RoomShowcaseSection } from './components/RoomShowcaseSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { HouseRulesSection } from './components/HouseRulesSection';
import { LocationSection } from './components/LocationSection';
import { ReservationSurveySection } from './components/ReservationSurveySection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Unlock, ExternalLink } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<AppStateData>(() => loadStoredData());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Form tab selection
  const [actionTab, setActionTab] = useState<'reservation' | 'survey'>('reservation');
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomUnit | null>(null);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string | null>(null);

  // Save changes automatically
  const handleUpdateData = (newData: AppStateData) => {
    setData(newData);
    saveStoredData(newData);
  };

  const handleAddReservation = (res: ReservationRequest) => {
    const updated = {
      ...data,
      reservations: [res, ...data.reservations],
    };
    handleUpdateData(updated);
  };

  const handleAddSurvey = (srv: SurveyRequest) => {
    const updated = {
      ...data,
      surveys: [srv, ...data.surveys],
    };
    handleUpdateData(updated);
  };

  const handleSelectRoomForBooking = (room: RoomUnit) => {
    setSelectedRoomForBooking(room);
    setSelectedRoomTypeId(room.typeId);
    setActionTab('reservation');
    const el = document.querySelector('#reservasi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTypeForBooking = (typeId: string) => {
    setSelectedRoomForBooking(null);
    setSelectedRoomTypeId(typeId);
    setActionTab('reservation');
    const el = document.querySelector('#reservasi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTypeForSurvey = (typeId: string) => {
    setSelectedRoomTypeId(typeId);
    setActionTab('survey');
    const el = document.querySelector('#reservasi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If Admin view is active, display the full admin dashboard
  if (showAdminDashboard && isAdminLoggedIn) {
    return (
      <AdminDashboard
        data={data}
        onUpdateData={handleUpdateData}
        onCloseDashboard={() => setShowAdminDashboard(false)}
        onLogout={() => {
          setIsAdminLoggedIn(false);
          setShowAdminDashboard(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Banner if logged in as Admin */}
      {isAdminLoggedIn && (
        <div className="bg-emerald-800 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-xs sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Unlock className="w-3.5 h-3.5 text-emerald-300" />
            <span>Mode Pengelola Aktif — Anda sedang melihat pratinjau landing page tamu</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdminDashboard(true)}
              className="bg-white text-emerald-800 px-3 py-1 rounded-md text-xs font-bold hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              Buka Dashboard Admin
            </button>
            <button
              onClick={() => setIsAdminLoggedIn(false)}
              className="text-emerald-200 hover:text-white underline cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        profile={data.profile}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setShowAdminLoginModal(true)}
        onOpenAdminDashboard={() => setShowAdminDashboard(true)}
        onSelectActionTab={(tab) => {
          setActionTab(tab);
          const el = document.querySelector('#reservasi');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Hero Section */}
      <HeroSection
        profile={data.profile}
        rooms={data.rooms}
        roomTypes={data.roomTypes}
        onOpenReservation={() => {
          setActionTab('reservation');
          const el = document.querySelector('#reservasi');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSurvey={() => {
          setActionTab('survey');
          const el = document.querySelector('#reservasi');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Live Room Availability Matrix */}
      <AvailabilitySection
        rooms={data.rooms}
        roomTypes={data.roomTypes}
        onSelectRoomForBooking={handleSelectRoomForBooking}
      />

      {/* Room Showcase & Pricing */}
      <RoomShowcaseSection
        roomTypes={data.roomTypes}
        rooms={data.rooms}
        onSelectTypeForBooking={handleSelectTypeForBooking}
        onSelectTypeForSurvey={handleSelectTypeForSurvey}
      />

      {/* Facilities Section */}
      <FacilitiesSection facilities={data.facilities} />

      {/* House Rules & Tata Tertib */}
      <HouseRulesSection rules={data.rules} />

      {/* Location & POI */}
      <LocationSection profile={data.profile} nearbyPlaces={data.nearbyPlaces} />

      {/* Interactive Reservation & Survey Booking Form */}
      <ReservationSurveySection
        profile={data.profile}
        roomTypes={data.roomTypes}
        rooms={data.rooms}
        activeTab={actionTab}
        setActiveTab={setActionTab}
        selectedRoomForBooking={selectedRoomForBooking}
        selectedRoomTypeId={selectedRoomTypeId}
        onAddReservation={handleAddReservation}
        onAddSurvey={handleAddSurvey}
      />

      {/* FAQ Accordion */}
      <FaqSection faqs={data.faqs} profile={data.profile} />

      {/* Footer */}
      <FooterSection
        profile={data.profile}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setShowAdminLoginModal(true)}
        onOpenAdminDashboard={() => setShowAdminDashboard(true)}
      />

      {/* Floating WhatsApp Contact Widget */}
      <FloatingWhatsApp profile={data.profile} />

      {/* Admin Login Dialog Modal */}
      <AdminLoginModal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
        onSuccess={() => {
          setIsAdminLoggedIn(true);
          setShowAdminDashboard(true);
        }}
        correctPasswordHash={data.adminPasswordHash}
      />

    </div>
  );
}
