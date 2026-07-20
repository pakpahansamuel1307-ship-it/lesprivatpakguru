import type { ClassOption, SectionMeta, StatItem, Subject } from "@/types";

export const SITE_URL = "https://pakguru-harinuan.vercel.app";

export const SITE_NAME = "Pak Harinuan Pakpahan — Guru Privat";

export const TEACHER = {
  fullName: "Harinuan Pakpahan",
  honorific: "Mr. Harinuan Pakpahan",
  shortName: "Pak Harinuan",
  role: "Guru Privat Matematika, Fisika & Kimia",
  whatsapp: "082111399065",
  whatsappHref: "https://wa.me/6282111399065",
  tiktok: "@pakguru2024",
  tiktokHref: "https://www.tiktok.com/@pakguru2024",
};

export const SECTIONS: SectionMeta[] = [
  { id: "home", label: "Home", index: 0 },
  { id: "about", label: "About", index: 1 },
  { id: "subjects", label: "Subjects", index: 2 },
  { id: "classes", label: "Classes", index: 3 },
  { id: "contact", label: "Contact", index: 4 },
];

export const HERO = {
  eyebrow: "Guru Privat · Matematika · Fisika · Kimia",
  heading: "Selamat datang di kelas Pak Guru",
  subheading:
    "Belajar Matematika, Fisika, dan Kimia jadi lebih mudah dipahami — dengan pendekatan privat yang disesuaikan dengan cara belajar setiap siswa.",
  ctaPrimary: "Booking Kelas",
  ctaSecondary: "Lihat Mata Pelajaran",
  badge: "Belajar secara Privat",
};

export const HERO_STATS: StatItem[] = [
  { value: "17+", label: "Tahun mengajar" },
  { value: "3", label: "Mata pelajaran" },
  { value: "SMP–SMA", label: "& persiapan UTBK" },
];

export const ABOUT = {
  eyebrow: "Tentang Saya",
  heading: "About",
  highlightName: "Mr. Harinuan Pakpahan",
  paragraph:
    "Guru profesional dengan pengalaman mengajar lebih dari 17 tahun di bidang Matematika, Fisika, dan Kimia. Memiliki kemampuan yang baik dalam menyampaikan materi secara efektif dan menciptakan lingkungan belajar yang positif. Bertanggung jawab, disiplin, serta berdedikasi dalam membantu siswa mencapai hasil belajar yang optimal.",
};

export const ABOUT_STATS: StatItem[] = [
  { value: "17+", label: "Tahun pengalaman" },
  { value: "3", label: "Matematika · Fisika · Kimia" },
  { value: "SMP–SMA", label: "& UTBK / Ujian Mandiri" },
];

export const SUBJECTS_INTRO = {
  eyebrow: "Apa yang Dipelajari",
  heading: "Mata Pelajaran",
  subtitle:
    "Materi untuk jenjang SMP – SMA, serta materi untuk persiapan UTBK maupun Ujian Mandiri PTN.",
};

export const SUBJECTS: Subject[] = [
  {
    id: "matematika",
    name: "Matematika",
    description:
      "Aljabar, geometri, hingga kalkulus dibedah langkah demi langkah sampai benar-benar masuk akal.",
    image: "/images/subject-math.jpg",
    glow: "periwinkle",
  },
  {
    id: "fisika",
    name: "Fisika",
    description:
      "Mekanika, listrik, dan termodinamika dijelaskan lewat logika dan intuisi, bukan hafalan rumus.",
    image: "/images/subject-physics.jpg",
    glow: "mint",
  },
  {
    id: "kimia",
    name: "Kimia",
    description:
      "Dari struktur atom sampai reaksi kimia, dipahami lewat contoh yang mudah dibayangkan.",
    image: "/images/subject-chemistry.jpg",
    glow: "marigold",
  },
];

export const CLASSES_INTRO = {
  eyebrow: "Pilihan Kelas",
  heading: "Tersedia",
  subtitle: "Tiga cara belajar, satu tujuan: paham betul, bukan sekadar lulus ujian.",
};

export const CLASSES: ClassOption[] = [
  {
    id: "privat",
    title: "Les Privat",
    description:
      "Belajar satu-lawan-satu di rumah atau lokasi pilihan, dengan materi yang disesuaikan kecepatan belajarmu.",
    image: "/images/class-private.jpg",
    features: ["Tatap muka langsung", "Materi disesuaikan", "Evaluasi tiap sesi"],
  },
  {
    id: "online",
    title: "Les Online",
    description:
      "Kelas interaktif lewat video call — tetap fokus dan personal meski belajar dari layar.",
    image: "/images/class-online.jpg",
    features: ["Fleksibel dari mana saja", "Materi terekam rapi", "Tanya-jawab langsung"],
  },
  {
    id: "fleksibel",
    title: "Jadwal Fleksibel",
    description:
      "Atur jadwal belajar sesuai kesibukan sekolah dan aktivitas, tanpa mengorbankan konsistensi.",
    image: "/images/class-flexible.jpg",
    features: ["Booking via WhatsApp", "Ganti jadwal mudah", "Sesi pengganti tersedia"],
  },
];

export const CONTACT = {
  eyebrow: "Hubungi Saya",
  heading: "Contact Me",
  subheading:
    "Ada pertanyaan soal kelas atau ingin booking jadwal? Kirim pesan, saya balas secepatnya.",
  ctaBoxed: "Hubungi saya untuk informasi lebih lanjut",
};
