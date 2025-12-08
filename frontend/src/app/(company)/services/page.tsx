// frontend/src/app/(company)/services/page.tsx

import { MOCK_SERVICES, Service } from '@/src/app/types/Company';
import ServiceCard from '@/src/components/ServiceCard';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="relative">
        {/* layer gradient lembut */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 opacity-80" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Header */}
          <header className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center rounded-full bg-slate-900/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 border border-white/25 mb-4">
              Layanan Kami
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-50 mb-3 tracking-tight">
              Solusi Digital yang Inovatif
            </h1>
            <p className="text-sm sm:text-lg text-slate-100/90 max-w-2xl mx-auto">
              Layanan yang dirancang untuk membantu bisnis Anda tumbuh, dari pengembangan aplikasi hingga optimalisasi sistem.
            </p>
          </header>

          {/* Grid layanan */}
          <section className="rounded-3xl bg-slate-950/95 border border-slate-800/70 shadow-[0_22px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl px-5 py-6 sm:px-7 sm:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {MOCK_SERVICES.map((service: Service) => (
                <div
                  key={service.id}
                  className="h-full rounded-2xl bg-white border border-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.3)]"
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </section>

          {/* Benefit Section */}
          <section className="mt-12 md:mt-14 rounded-3xl bg-slate-950/92 border border-slate-800/70 shadow-[0_18px_50px_rgba(15,23,42,0.85)] px-5 py-7 sm:px-7 sm:py-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50 text-center mb-6">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 text-center max-w-2xl mx-auto mb-8">
              Kami menggabungkan keahlian teknis, proses yang jelas, dan dukungan jangka panjang untuk memastikan setiap proyek berjalan mulus.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {[
                'Fokus pada kualitas kode, keamanan, dan performa.',
                'Komunikasi transparan, update rutin, dan tim yang responsif.',
                'Solusi scalable yang siap tumbuh bersama bisnis Anda.',
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl bg-slate-900 border border-slate-800 px-4 py-4 shadow-sm shadow-slate-900/60"
                >
                  <CheckCircleIcon className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-slate-200">{benefit}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
