// backend/src/types/Company.ts

// Tipe data harus sesuai dengan model CompanyProfile di Prisma
export interface CompanyProfile {
  id: number;
  name: string;
  tagline: string | null;
  description: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  // Menambahkan bidang khusus untuk frontend agar lebih kaya
  vision: string;
  mission: string[];
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string; // Placeholder untuk nama icon (misalnya, dari Heroicons)
}

// Data Mock (Dummy Data) untuk Frontend
// Data ini akan diganti dengan API call dari backend nanti
export const MOCK_PROFILE: CompanyProfile = {
    id: 1,
    name: "PT. Digital Solusi Abadi",
    tagline: "Membangun Masa Depan Digital Anda",
    description: "PT. Digital Solusi Abadi adalah perusahaan teknologi yang berfokus pada pengembangan solusi perangkat lunak kustom, kecerdasan buatan, dan konsultasi digital. Kami berdedikasi untuk memberikan inovasi terbaik, efisiensi operasional, dan pengalaman pengguna yang tak tertandingi bagi semua klien kami.",
    address: "Jl. Sudirman No. 12, Jakarta Selatan, 12930",
    phone: "+62 812-3456-7890",
    email: "info@digitalsolusi.com",
    vision: "Menjadi mitra digital terdepan dan terpercaya di Asia Tenggara pada tahun 2028.",
    mission: [
        "Menciptakan produk digital yang inovatif, skalabel, dan relevan.",
        "Mengutamakan kualitas layanan, integritas, dan kepuasan klien di atas segalanya.",
        "Membangun tim yang berbudaya kolaboratif, profesional, dan selalu belajar."
    ]
};

export const MOCK_SERVICES: Service[] = [
    { id: 1, title: "Pengembangan Aplikasi Web Kustom", description: "Merancang dan membangun aplikasi web tingkat perusahaan yang cepat, aman, dan dioptimalkan untuk performa tinggi.", icon: "CodeBracketIcon" },
    { id: 2, title: "Layanan Cloud & DevOps", description: "Membantu migrasi ke cloud, mengelola infrastruktur, dan mengotomatisasi pipeline deployment (CI/CD) menggunakan AWS/GCP.", icon: "CloudArrowUpIcon" },
    { id: 3, title: "Konsultasi UX/UI Design", description: "Menciptakan desain antarmuka yang intuitif dan menarik, berfokus pada pengalaman pengguna yang efektif dan menyenangkan.", icon: "PaintBrushIcon" },
];