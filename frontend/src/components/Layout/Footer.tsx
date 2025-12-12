import { BuildingOfficeIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Footer() {
  return (
    // UBAH DISINI: bg-indigo-950 untuk warna dasar indigo gelap yang solid
    <footer className="relative z-10 bg-indigo-950 text-indigo-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Kolom 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-wider">DigitalSolusi</h3>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Membangun Masa Depan Digital Anda dengan solusi teknologi terdepan dan inovatif.
            </p>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-white transition-colors">Profil Perusahaan</Link></li>
              <li><Link href="/layanan" className="hover:text-white transition-colors">Layanan Kami</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontak Kami</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="w-4 h-4" />
                <span>info@digitalsolusi.com</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-start gap-2">
                <BuildingOfficeIcon className="w-4 h-4 mt-1" />
                <span>Jl. Sudirman No. 12, Jakarta Selatan, 12930</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-indigo-800 pt-8 text-center text-xs text-indigo-400">
          <p>&copy; {new Date().getFullYear()} PT. Digital Solusi Abadi. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
