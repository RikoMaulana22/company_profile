// frontend/src/components/Layout/Footer.tsx
import Link from 'next/link';
import { MOCK_PROFILE } from '@/src/app/types/Company';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700">
        
        {/* Kolom 1: Logo & Deskripsi Singkat */}
        <div>
          <h3 className="text-2xl font-bold text-indigo-400 mb-3">DigitalSolusi</h3>
          <p className="text-sm text-gray-400">
            {MOCK_PROFILE.tagline}
          </p>
        </div>

        {/* Kolom 2: Navigasi Cepat */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Tautan Cepat</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-gray-400 hover:text-indigo-400 transition">Beranda</Link></li>
            <li><Link href="/profile" className="text-gray-400 hover:text-indigo-400 transition">Profil Perusahaan</Link></li>
            <li><Link href="/services" className="text-gray-400 hover:text-indigo-400 transition">Layanan Kami</Link></li>
          </ul>
        </div>

        {/* Kolom 3: Kontak */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Kontak Kami</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Email: {MOCK_PROFILE.email}</p>
            <p>Telepon: {MOCK_PROFILE.phone}</p>
            <p>Alamat: {MOCK_PROFILE.address}</p>
          </div>
        </div>

        {/* Kolom 4: Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="text-gray-400 hover:text-indigo-400 transition">Kebijakan Privasi</Link></li>
            <li><Link href="/terms" className="text-gray-400 hover:text-indigo-400 transition">Syarat & Ketentuan</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto text-center py-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} PT. Digital Solusi Abadi. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
}