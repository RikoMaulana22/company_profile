// frontend/src/app/(company)/profile/page.tsx
import { MOCK_PROFILE, CompanyProfile } from '@/src/app/types/Company';

// sementara pakai mock
async function getProfileData(): Promise<CompanyProfile> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_PROFILE;
}

export default async function ProfilePage() {
  const profile = await getProfileData();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* lapisan gradient seperti hero */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 opacity-80" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Header */}
          <header className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-100 mb-4 border border-indigo-400/60">
              Profil Perusahaan
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-50 mb-3 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-sm sm:text-lg text-slate-100/90 max-w-2xl mx-auto">
              {profile.tagline}
            </p>
          </header>

          {/* FRAME BESAR: semua konten di dalam satu card */}
          <div className="rounded-3xl bg-slate-950/95 border border-slate-800/70 shadow-[0_22px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl px-6 py-7 sm:px-8 sm:py-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {/* Kolom kiri: Tentang + Misi */}
              <div className="space-y-6">
                {/* Tentang Kami */}
                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-5 sm:px-6 sm:py-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                    Tentang Kami
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700">
                    {profile.description}
                  </p>
                </section>

                {/* Misi Kami */}
                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-5 sm:px-6 sm:py-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                    Misi Kami
                  </h2>
                  <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
                    {profile.mission.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Kolom kanan: Visi + Kontak */}
              <div className="space-y-6">
                {/* Visi */}
                <section className="rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-500 to-sky-500 shadow-md shadow-sky-500/40 px-5 py-5 sm:px-6 sm:py-6 text-slate-50">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3">
                    Visi
                  </h2>
                  <p className="text-sm sm:text-base italic leading-relaxed text-indigo-50">
                    “{profile.vision}”
                  </p>
                </section>

                {/* Kontak */}
                <section className="rounded-2xl bg-slate-900 border border-slate-800 px-5 py-5 sm:px-6 sm:py-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-3 border-b border-slate-700 pb-2">
                    Kontak
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base text-slate-200">
                    <p>
                      <span className="font-medium text-slate-50">Alamat:</span>{' '}
                      <span>{profile.address}</span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-50">Telepon:</span>{' '}
                      <span>{profile.phone}</span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-50">Email:</span>{' '}
                      <span>{profile.email}</span>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
          {/* END FRAME */}
        </div>
      </div>
    </div>
  );
}
