import { AppStateData } from '../types';

export const INITIAL_DATA: AppStateData = {
  profile: {
    name: 'Kost Griya Nirmala',
    tagline: 'Hunian Eksklusif, Nyaman & Nyaman di Pusat Kota',
    shortBio: 'Kost modern dengan fasilitas sekelas apartemen studio. Didesain khusus untuk mahasiswa dan pekerja profesional yang menginginkan ketenangan istirahat, keamanan 24 jam, dan akses cepat ke pusat perkantoran maupun kampus.',
    genderType: 'Campur',
    address: 'Jl. Melati Indah No. 28, Setiabudi, Jakarta Selatan',
    city: 'Jakarta Selatan',
    googleMapsUrl: 'https://maps.google.com/?q=Setiabudi+Jakarta+Selatan',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2941551522204!2d106.82092287499039!3d-6.224892493763183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3fb77a7f727%3A0x6b6fa3f4438b8128!2sSetiabudi%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
    whatsappNumber: '6281289001122',
    phoneNumber: '0812-8900-1122',
    email: 'kontak@kostgriyanirmala.com',
    operationalHours: 'Setiap Hari (07.00 - 21.00 WIB)',
    heroImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=80',
    aboutImages: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    electricityIncluded: false, // Token mandiri tiap kamar
    waterIncluded: true,
    wifiIncluded: true,
    depositAmount: 500000,
  },
  roomTypes: [
    {
      id: 'type-standard',
      name: 'Standard Cozy',
      tagline: 'Pilihan hemat, fungsional & nyaman untuk 1 orang',
      priceMonthly: 1850000,
      priceDaily: 150000,
      priceYearly: 20500000,
      size: '3 x 4 meter (12 m²)',
      bedType: 'Single Bed (100x200) Springbed',
      maxGuests: 1,
      description: 'Kamar berpenerangan alami dengan jendela, kasur springbed empuk, meja belajar/kerja ergonomis, lemari pakaian 2 pintu, dan kamar mandi dalam lengkap.',
      images: [
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80'
      ],
      features: [
        'AC 0.5 PK hemat energi',
        'Kamar Mandi Dalam + Shower',
        'Kasur Single Springbed + Bantal Guling',
        'Meja Belajar & Kursi Ergonomis',
        'Lemari Pakaian 2 Pintu + Cermin',
        'WiFi Fiber Optic 100 Mbps',
        'Ventilasi Udara & Jendela Luar'
      ],
      isPopular: false
    },
    {
      id: 'type-deluxe',
      name: 'Deluxe Executive',
      tagline: 'Paling favorit! Lebih lega dengan Smart TV & Water Heater',
      priceMonthly: 2450000,
      priceDaily: 200000,
      priceYearly: 27000000,
      size: '3.5 x 4.5 meter (16 m²)',
      bedType: 'Queen Bed (160x200) Springbed',
      maxGuests: 2,
      description: 'Kamar luas dengan ranjang Queen, Smart TV 32 inch, Water Heater air hangat, meja kerja lebar dengan stopkontak lengkap untuk WFH atau belajar produktif.',
      images: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80'
      ],
      features: [
        'AC 1 PK Daikin Inverter',
        'Kamar Mandi Dalam + Water Heater',
        'Smart TV 32 inch (Netflix Ready)',
        'Kasur Queen (160x200) Berkualitas',
        'Meja Kerja Luas + Rak Buku',
        'Lemari Pakaian Besar 3 Pintu',
        'Kulkas Mini Pribadi',
        'Jendela Besar + Gorden Blackout'
      ],
      isPopular: true
    },
    {
      id: 'type-suite',
      name: 'VIP Suite Studio',
      tagline: 'Tipe termewah berkonsep apartemen dengan balkon pribadi',
      priceMonthly: 3100000,
      priceDaily: 275000,
      priceYearly: 34500000,
      size: '4 x 5 meter (20 m²)',
      bedType: 'King Bed (180x200) Premium',
      maxGuests: 2,
      description: 'Tipe kamar premium di lantai teratas dengan balkon pribadi pemandangan kota, pantry kecil pribadi di dalam kamar, Smart TV 43 inch, dan sofa santai.',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80'
      ],
      features: [
        'Balkon Pribadi dengan Kursi Santai',
        'AC 1 PK Inverter',
        'Kamar Mandi Mewah + Water Heater + Wastafel',
        'Smart TV 43 inch 4K',
        'Mini Pantry Pribadi (Sink + Rak)',
        'Sofa Santai 2 Seater',
        'Kasur King Size Hotel Grade',
        'Dispensasi Parkir Mobil Khusus'
      ],
      isPopular: false
    }
  ],
  rooms: [
    { id: 'rm-101', roomNumber: '101', floor: 1, typeId: 'type-standard', status: 'occupied', occupantName: 'Andi P.' },
    { id: 'rm-102', roomNumber: '102', floor: 1, typeId: 'type-standard', status: 'available' },
    { id: 'rm-103', roomNumber: '103', floor: 1, typeId: 'type-deluxe', status: 'available' },
    { id: 'rm-104', roomNumber: '104', floor: 1, typeId: 'type-deluxe', status: 'occupied', occupantName: 'Dimas S.' },
    { id: 'rm-105', roomNumber: '105', floor: 1, typeId: 'type-standard', status: 'booked', occupantName: 'Rian T.' },
    { id: 'rm-201', roomNumber: '201', floor: 2, typeId: 'type-standard', status: 'occupied', occupantName: 'Siti M.' },
    { id: 'rm-202', roomNumber: '202', floor: 2, typeId: 'type-deluxe', status: 'available' },
    { id: 'rm-203', roomNumber: '203', floor: 2, typeId: 'type-deluxe', status: 'occupied', occupantName: 'Fajar K.' },
    { id: 'rm-204', roomNumber: '204', floor: 2, typeId: 'type-suite', status: 'available' },
    { id: 'rm-205', roomNumber: '205', floor: 2, typeId: 'type-suite', status: 'occupied', occupantName: 'Bima W.' },
  ],
  facilities: [
    {
      id: 'fac-1',
      name: 'Kamar Mandi Dalam',
      category: 'kamar',
      description: 'Setiap kamar dilengkapi kamar mandi pribadi dengan kloset duduk, shower, dan ventilasi yang higienis.',
      iconName: 'Bath'
    },
    {
      id: 'fac-2',
      name: 'AC Hemat Listrik',
      category: 'kamar',
      description: 'Pendingin ruangan dingin terawat rutin di seluruh tipe kamar untuk tidur nyenyak maksimal.',
      iconName: 'Wind'
    },
    {
      id: 'fac-3',
      name: 'WiFi Cepat 100 Mbps',
      category: 'bersama',
      description: 'Koneksi internet dedicated fiber optic dengan access point di tiap lantai, stabil untuk meeting zoom & streaming.',
      iconName: 'Wifi'
    },
    {
      id: 'fac-4',
      name: 'Dapur Bersama Lengkap',
      category: 'bersama',
      description: 'Dapur bersama bersih dengan kompor gas, microwave, kulkas bersama, dan air minum galon gratis sepuasnya.',
      iconName: 'Utensils'
    },
    {
      id: 'fac-5',
      name: 'CCTV & Keamanan 24 Jam',
      category: 'keamanan',
      description: 'Pengawasan kamera CCTV 24 titik di seluruh area publik serta penjaga kost yang standby setiap waktu.',
      iconName: 'ShieldCheck'
    },
    {
      id: 'fac-6',
      name: 'Akses Smart Card / Fingerprint',
      category: 'keamanan',
      description: 'Pintu gerbang utama menggunakan akses digital khusus penghuni demi privasi dan keamanan ekstra.',
      iconName: 'KeyRound'
    },
    {
      id: 'fac-7',
      name: 'Parkir Motor & Mobil Beratap',
      category: 'parkir',
      description: 'Area parkir luas berkanopi terlindung panas dan hujan, dilengkapi penerangan terang malam hari.',
      iconName: 'Car'
    },
    {
      id: 'fac-8',
      name: 'Mesin Cuci & Area Jemur',
      category: 'bersama',
      description: 'Disediakan mesin cuci otomatis 2 unit dan area jemur pakaian beratap transparan di lantai 3.',
      iconName: 'Shirt'
    },
    {
      id: 'fac-9',
      name: 'Ruang Tamu & Co-Working',
      category: 'bersama',
      description: 'Area santai di lantai dasar dengan sofa empuk, colokan listrik banyak, dan suasana tenang untuk diskusi santai.',
      iconName: 'Users'
    }
  ],
  rules: [
    {
      id: 'rule-1',
      title: 'Jam Bertamu & Akses Gerbang',
      category: 'tamu',
      description: 'Tamu diperkenankan berkunjung hingga pukul 22.00 WIB dan hanya diperbolehkan di ruang tamu utama. Akses gerbang bagi penghuni aktif 24 jam dengan kartu akses.'
    },
    {
      id: 'rule-2',
      title: 'Ketentuan Tamu Lawan Jenis',
      category: 'tamu',
      description: 'Tamu lawan jenis tidak diperkenankan masuk ke dalam kamar tidur penghuni demi kenyamanan bersama. Tamu dapat diterima di ruang tamu bersama.'
    },
    {
      id: 'rule-3',
      title: 'Bebas Asap Rokok di Dalam Kamar',
      category: 'kebersihan',
      description: 'Dilarang merokok atau vape di dalam kamar dan koridor ber-AC. Merokok hanya diperbolehkan di area outdoor balkon / taman khusus merokok.'
    },
    {
      id: 'rule-4',
      title: 'Hewan Peliharaan',
      category: 'umum',
      description: 'Tidak diperkenankan membawa hewan peliharaan (kucing, anjing, dll.) demi menjaga kebersihan, ketenangan, dan alergi antar penghuni.'
    },
    {
      id: 'rule-5',
      title: 'Ketenangan Waktu Istirahat',
      category: 'umum',
      description: 'Harap menjaga ketenangan suara mulai pukul 22.00 - 06.00 WIB. Tidak memutar musik dengan volume keras tanpa earphone.'
    },
    {
      id: 'rule-6',
      title: 'Kebersihan Fasilitas Bersama',
      category: 'kebersihan',
      description: 'Wajib mencuci peralatan masak sendiri setelah menggunakan dapur bersama dan menjaga kebersihan tempat sampah di area koridor.'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Apakah harga sewa sudah termasuk listrik dan air?',
      answer: 'Biaya sewa bulanan sudah termasuk air bersih dan fasilitas WiFi gratis. Untuk listrik menggunakan meteran token mandiri tiap kamar sehingga Anda hanya membayar sesuai pemakaian pribadi.',
      category: 'Biaya'
    },
    {
      id: 'faq-2',
      question: 'Bagaimana cara survey langsung ke lokasi kost?',
      answer: 'Anda dapat mengisi formulir Jadwal Survey di website ini atau langsung menghubungi WhatsApp pengelola. Kami sarankan konfirmasi 1-2 jam sebelum kedatangan agar pengelola dapat menyambut Anda.',
      category: 'Survey'
    },
    {
      id: 'faq-3',
      question: 'Apakah ada uang deposit saat awal masuk?',
      answer: 'Ya, terdapat deposit jaminan sebesar Rp 500.000 saat awal sewa yang akan dikembalikan secara utuh 100% pada akhir masa sewa apabila tidak ada kerusakan fasilitas atau tunggakan.',
      category: 'Biaya'
    },
    {
      id: 'faq-4',
      question: 'Apakah boleh sewa berdua dalam 1 kamar?',
      answer: 'Untuk tipe Deluxe dan VIP Suite diperbolehkan berdua (sesama jenis atau pasangan suami-istri sah dengan melampirkan buku nikah). Terdapat biaya tambahan Rp 350.000/bulan untuk orang kedua.',
      category: 'Kamar'
    },
    {
      id: 'faq-5',
      question: 'Apakah parkir mobil dikenakan biaya tambahan?',
      answer: 'Parkir motor gratis untuk setiap penghuni kamar. Untuk parkir mobil tersedia slot terbatas dengan biaya retribusi Rp 250.000/bulan (gratis untuk tipe VIP Suite).',
      category: 'Fasilitas'
    },
    {
      id: 'faq-6',
      question: 'Bagaimana proses pembayaran dan perpanjangan sewa?',
      answer: 'Pembayaran dilakukan via transfer bank setiap tanggal jatuh tempo sewa. Pengingat tagihan otomatis akan dikirimkan melalui WhatsApp pengelola 5 hari sebelum jatuh tempo.',
      category: 'Biaya'
    }
  ],
  nearbyPlaces: [
    { id: 'poi-1', name: 'Universitas Bakrie / Kawasan Rasuna', distance: '5 Menit (1.2 km)', category: 'kampus' },
    { id: 'poi-2', name: 'Stasiun MRT Setiabudi Astra', distance: '7 Menit (1.8 km)', category: 'transportasi' },
    { id: 'poi-3', name: 'Halte TransJakarta Kuningan Madya', distance: '3 Menit (600 m)', category: 'transportasi' },
    { id: 'poi-4', name: 'Indomaret & Alfamart 24 Jam', distance: '1 Menit (80 m)', category: 'belanja' },
    { id: 'poi-5', name: 'Pusat Kuliner Pasar Festival & Setiabudi One', distance: '4 Menit (1 km)', category: 'kuliner' },
    { id: 'poi-6', name: 'RS MMC Kuningan', distance: '6 Menit (1.5 km)', category: 'kesehatan' },
  ],
  reservations: [
    {
      id: 'res-01',
      name: 'Nadia Safitri',
      whatsapp: '081233445566',
      roomTypeId: 'type-deluxe',
      roomNumber: '103',
      checkInDate: '2026-10-15',
      durationMonths: 3,
      occupantType: 'karyawan',
      notes: 'Bawa motor beat, rencana masuk siang hari jam 14.00.',
      status: 'pending',
      createdAt: '2026-10-07T10:30:00.000Z'
    },
    {
      id: 'res-02',
      name: 'Kevin Jonathan',
      whatsapp: '081799887766',
      roomTypeId: 'type-standard',
      roomNumber: '102',
      checkInDate: '2026-10-20',
      durationMonths: 6,
      occupantType: 'mahasiswa',
      notes: 'Mahasiswa baru, butuh meja kerja rapi.',
      status: 'confirmed',
      createdAt: '2026-10-06T15:15:00.000Z'
    }
  ],
  surveys: [
    {
      id: 'srv-01',
      name: 'Rahmat Hidayat',
      whatsapp: '085711223344',
      surveyDate: '2026-10-10',
      surveyTime: '14:00',
      roomTypeId: 'type-deluxe',
      notes: 'Ingin lihat sirkulasi udara dan tempat parkir mobil.',
      status: 'confirmed',
      createdAt: '2026-10-08T09:00:00.000Z'
    },
    {
      id: 'srv-02',
      name: 'Tiara Maharani',
      whatsapp: '087855667788',
      surveyDate: '2026-10-11',
      surveyTime: '10:30',
      roomTypeId: 'type-suite',
      notes: 'Survey bersama rekan kerja.',
      status: 'pending',
      createdAt: '2026-10-08T11:20:00.000Z'
    }
  ],
  adminPasswordHash: 'kost123' // default password mudah diingat, bisa diubah kapan saja di tab admin
};

export const LOCAL_STORAGE_KEY = 'kost_griya_nirmala_data_v1';
