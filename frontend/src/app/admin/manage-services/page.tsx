'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, PlusIcon, PencilIcon, TrashIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { fetchWithAuth } from '@/src/utils/api';

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function ManageServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Services
  const loadServices = async () => {
    try {
      const res = await fetchWithAuth('/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  // Handle Delete
  const handleDelete = async (id: number) => {
    if(!confirm('Yakin ingin menghapus layanan ini?')) return;

    try {
      const res = await fetchWithAuth(`/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter(s => s.id !== id)); // Hapus dari state
      } else {
        alert('Gagal menghapus.');
      }
    } catch (err) {
      alert('Error saat menghapus.');
    }
  };

  return (
    <div className="min-h-screen bg-[#111315] text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-4">
              <button onClick={() => router.push('/admin/dashboard')} className="p-2 bg-[#1a1c1e] rounded-lg hover:bg-gray-800 transition">
                <ArrowLeftIcon className="w-5 h-5 text-gray-400" />
              </button>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <ListBulletIcon className="w-7 h-7 text-orange-500" />
                Daftar Layanan
              </h1>
           </div>
           <button 
             onClick={() => router.push('/admin/manage-services/create')}
             className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium transition shadow-lg shadow-emerald-900/20"
           >
             <PlusIcon className="w-5 h-5" />
             Tambah Layanan
           </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <p className="text-gray-500">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-[#1a1c1e] border border-gray-800 rounded-2xl overflow-hidden flex flex-col group hover:border-gray-600 transition">
                
                {/* Image Placeholder / Real Image */}
                <div className="h-40 bg-gray-800 relative">
                   {service.imageUrl ? (
                     <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                   )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                    <button 
                      onClick={() => router.push(`/admin/manage-services/edit/${service.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition text-sm"
                    >
                      <PencilIcon className="w-4 h-4" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white transition text-sm"
                    >
                      <TrashIcon className="w-4 h-4" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
