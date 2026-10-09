import { AppStateData, ReservationRequest, SurveyRequest, KostProfile } from '../types';
import { INITIAL_DATA, LOCAL_STORAGE_KEY } from '../data/initialData';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}

export function formatDateIndo(dateStr: string): string {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function cleanPhoneForWhatsapp(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

export function createWhatsappUrl(phone: string, text: string): string {
  const cleanPhone = cleanPhoneForWhatsapp(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function generateReservationWhatsappText(
  profile: KostProfile,
  res: ReservationRequest,
  roomTypeName: string
): string {
  return `Halo Pengelola ${profile.name}, saya ingin konfirmasi permohonan reservasi kamar:

*Nama Lengkap:* ${res.name}
*No. WhatsApp:* ${res.whatsapp}
*Tipe Kamar:* ${roomTypeName} ${res.roomNumber ? `(Pilihan No. ${res.roomNumber})` : ''}
*Rencana Check-in:* ${formatDateIndo(res.checkInDate)}
*Durasi Sewa:* ${res.durationMonths} Bulan
*Kategori Penghuni:* ${res.occupantType.toUpperCase()}
${res.notes ? `*Catatan Khusus:* ${res.notes}` : ''}

Mohon info ketersediaan dan panduan langkah selanjutnya. Terima kasih!`;
}

export function generateSurveyWhatsappText(
  profile: KostProfile,
  survey: SurveyRequest,
  roomTypeName: string
): string {
  return `Halo Pengelola ${profile.name}, saya ingin menjadwalkan kunjungan survey lokasi kost:

*Nama:* ${survey.name}
*No. WhatsApp:* ${survey.whatsapp}
*Rencana Tanggal Survey:* ${formatDateIndo(survey.surveyDate)}
*Estimasi Jam:* ${survey.surveyTime} WIB
*Minat Tipe Kamar:* ${roomTypeName}
${survey.notes ? `*Catatan:* ${survey.notes}` : ''}

Apakah waktu tersebut tersedia untuk didampingi pengelola? Terima kasih.`;
}

export function loadStoredData(): AppStateData {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure merged with current shape in case of new schema fields
      return {
        ...INITIAL_DATA,
        ...parsed,
        profile: { ...INITIAL_DATA.profile, ...(parsed.profile || {}) },
      };
    }
  } catch (err) {
    console.error('Failed to load local storage data:', err);
  }
  return INITIAL_DATA;
}

export function saveStoredData(data: AppStateData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save data to localStorage:', err);
  }
}
