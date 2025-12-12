'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { fetchWithAuth } from '@/src/utils/api';

export default function CreateServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '' // Nanti bisa dikembangkan dengan upload file
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetchWithAuth('/services', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/manage-services');
      } else {
        alert('Gagal menambah layanan');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111315] text-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-8 flex items-center gap-4">
           <button onClick={() => router.back()} className="text-gray-400 hover:text-white"><ArrowLeftIcon className="w-6 h-6"/></button>
           <h1 className="text-2xl font-bold text-white">Tambah Layanan Baru</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1c1e] p-8 rounded-2xl border border-gray-800 space-y-6">
            
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Judul Layanan</label>
              <input 
                required
                type="text" 
                className="w-full bg-[#111315] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Deskripsi Detail</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-[#111315] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* URL Gambar (Sementara Text dulu, bisa diganti Upload) */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">URL Gambar (Opsional)</label>
              <input 
                type="text" 
                placeholder="https://..."
                className="w-full bg-[#111315] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              />
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/20 disabled:opacity-50 mt-4"
            >
                {isSubmitting ? 'Menyimpan...' : 'Terbitkan Layanan'}
            </button>
        </form>

      </div>
    </div>
  );
}
