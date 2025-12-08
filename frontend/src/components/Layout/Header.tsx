// frontend/src/components/Layout/Header.tsx
import Link from 'next/link';

export default function Header() {
  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profile' },
    { name: 'Layanan', href: '/services' },
    { name: 'Admin Login', href: '/admin/login', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* layer kaca tipis */}
      <div className="backdrop-blur-xl bg-slate-900/60 border-b border-slate-800">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 text-xl sm:text-2xl font-extrabold tracking-tight"
          >
            <span className="text-indigo-400">Digital</span>
            <span className="text-slate-50">Solusi</span>
          </Link>

          {/* Nav items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={[
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  item.highlight
                    ? 'bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 text-slate-950 shadow-md shadow-sky-500/40 hover:shadow-emerald-400/50 hover:brightness-110'
                    : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/70',
                ].join(' ')}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile: hanya tombol login / menu sederhana */}
          <div className="md:hidden">
            <Link
              href="/admin/login"
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500 text-slate-50 shadow-sm hover:bg-indigo-400 transition-all"
            >
              Admin
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
