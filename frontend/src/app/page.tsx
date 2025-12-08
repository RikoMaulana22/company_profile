import Link from 'next/link';
import ServiceCard from '@/src/components/ServiceCard';
import { MOCK_PROFILE, MOCK_SERVICES } from '@/src/app/types/Company';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 opacity-80" />
        {/* mesh / overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),_transparent_55%)]" />

        {/* shooting stars / comet jatuh di belakang teks */}
        <div className="shooting-star-layer">
          <div className="shooting-star shooting-star--1" />
          <div className="shooting-star shooting-star--2" />
          <div className="shooting-star shooting-star--3" />
          <div className="shooting-star shooting-star--4" />
    
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-100 backdrop-blur-md border border-white/20 mb-6">
            Solusi digital untuk bisnis berkembang
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md">
            {MOCK_PROFILE.name}
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-slate-100/90 mb-10">
            {MOCK_PROFILE.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-slate-950/90 px-7 py-3 text-sm sm:text-base font-semibold text-slate-50 shadow-lg shadow-slate-900/50 hover:shadow-slate-900/70 hover:bg-slate-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-100 focus-visible:ring-offset-slate-900"
            >
              Lihat Layanan Kami
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="#contact-cta"
              className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-6 py-2.5 text-sm sm:text-base font-medium text-slate-50 hover:bg-white/20 hover:border-white transition-all backdrop-blur-md"
            >
              Konsultasi Gratis
            </Link>
          </div>

          {/* subtle bottom blur */}
          <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="bg-slate-950 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-50 mb-3">
              Apa yang Kami Tawarkan?
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Layanan yang dirancang untuk membantu bisnis Anda tumbuh, dari perencanaan hingga eksekusi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MOCK_SERVICES.map(service => (
              <div key={service.id} className="group h-full">
                <div className="h-full rounded-2xl bg-slate-900/70 border border-slate-800/70 shadow-sm shadow-slate-900/60 p-5 sm:p-6 flex flex-col transition-all duration-200 group-hover:border-sky-500/80 group-hover:shadow-md group-hover:-translate-y-1 group-hover:bg-slate-900">
                  <ServiceCard service={service} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center text-sm sm:text-base font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              Lihat Semua Layanan
              <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact-cta" className="bg-slate-950 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/90 px-6 py-10 sm:px-10 sm:py-12 shadow-[0_18px_60px_rgba(15,23,42,0.9)]">
            <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-gradient-to-tr from-sky-500/40 via-indigo-500/40 to-emerald-400/40 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-gradient-to-tr from-fuchsia-500/30 via-indigo-500/30 to-sky-400/30 blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-3">
                  Siap Memulai Proyek Anda?
                </h2>
                <p className="text-sm sm:text-base text-slate-400">
                  Ceritakan kebutuhan Anda, dan dapatkan rekomendasi solusi terbaik untuk bisnis secara gratis.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-sky-500/40 hover:bg-sky-400 hover:shadow-sky-400/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-slate-900"
                >
                  Hubungi Sekarang
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-transparent px-6 py-2.5 text-sm sm:text-base font-medium text-slate-200 hover:bg-slate-800/60 transition-all"
                >
                  Lihat Layanan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
