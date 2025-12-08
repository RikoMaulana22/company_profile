'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const API_URL = 'http://localhost:5000/api/auth/login';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post<{ token: string; user: { id: number; email: string } }>(
        API_URL,
        { email, password }
      );
      const { token } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', token);
      }
      router.replace('/admin/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const apiError = err.response.data as { message: string };
        setError(apiError.message || 'Login gagal. Cek kembali email dan password.');
      } else {
        setError('Terjadi kesalahan jaringan atau server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Latar luar angkasa */}
      {/* gradient dasar gelap */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      {/* aura biru–hijau */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(16,185,129,0.4),_transparent_55%)]" />
      {/* grid tipis */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,_rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,_rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
      {/* bintang bergerak */}
      <div className="stars" />

      {/* orbit satelit di belakang card */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="satellite-orbit-path">
          <div className="satellite" />
        </div>
      </div>

      {/* card login glassmorphism */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="rounded-3xl border border-white/20 bg-slate-900/60 bg-clip-padding shadow-[0_22px_70px_rgba(15,23,42,0.9)] backdrop-blur-2xl px-7 py-8 sm:px-9 sm:py-9">
          <div className="text-center mb-7">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 via-sky-400 to-emerald-300 shadow-lg shadow-sky-500/50">
              <LockClosedIcon className="h-6 w-6 text-slate-950" />
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-slate-50 tracking-tight">
              Panel Admin
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Masuk untuk mengelola data dan konfigurasi sistem.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                className="block w-full rounded-2xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-400/70 shadow-sm outline-none backdrop-blur-sm transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-500/70"
                placeholder="admin@domain.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                className="block w-full rounded-2xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-400/70 shadow-sm outline-none backdrop-blur-sm transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-500/70"
                placeholder="Masukkan password Anda"
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-2xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-xs sm:text-sm text-rose-100"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:shadow-emerald-400/50 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Memverifikasi...' : 'Login'}
            </button>

            <p className="mt-3 text-[11px] text-center text-slate-400">
              Akses hanya untuk administrator yang berwenang.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
