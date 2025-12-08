// frontend/src/app/admin/manage-services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Service, MOCK_SERVICES } from '@/src/app/types/Company';
import { PlusIcon, TrashIcon, PencilIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const API_URL = 'http://localhost:5000/api/services';

export default function ManageServicesPage() {
    const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState<Service | null>(null); // Untuk Edit/Add
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

    useEffect(() => {
        if (!token) {
            router.push('/admin/login');
            return;
        }
        fetchServices();
    }, [router, token]);

    const fetchServices = async () => {
        setLoading(true);
        try {
            // Mengambil daftar layanan dari backend
            const response = await axios.get<Service[]>(API_URL);
            setServices(response.data);
        } catch (err) {
            setError("Gagal mengambil data layanan. Menggunakan data mock.");
            setServices(MOCK_SERVICES); // Fallback
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;
        
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setServices(services.filter(s => s.id !== id));
            alert('Layanan berhasil dihapus!');
        } catch (err) {
            setError('Gagal menghapus layanan.');
        }
    };

    const handleOpenModal = (service: Service | null = null) => {
        setCurrentService(service);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto p-8">
            <button 
                onClick={() => router.back()} 
                className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" /> Kembali ke Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Kelola Layanan Perusahaan</h1>
            
            <button 
                onClick={() => handleOpenModal()} 
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition mb-6"
            >
                <PlusIcon className="w-5 h-5 mr-2" /> Tambah Layanan Baru
            </button>

            {loading && <p>Memuat data...</p>}
            {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg mb-4">{error}</div>}

            <div className="space-y-4">
                {services.map((service) => (
                    <div key={service.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow border border-gray-100">
                        <div>
                            <p className="text-lg font-semibold">{service.title}</p>
                            <p className="text-sm text-gray-600">{service.description.substring(0, 100)}...</p>
                        </div>
                        <div className="flex space-x-3">
                            <button 
                                onClick={() => handleOpenModal(service)}
                                className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50 transition"
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => handleDelete(service.id)}
                                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <ServiceModal 
                    service={currentService} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={() => {
                        fetchServices(); 
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}


// Komponen Modal Tambah/Edit Layanan
interface ServiceModalProps {
    service: Service | null;
    onClose: () => void;
    onSave: () => void;
}

function ServiceModal({ service, onClose, onSave }: ServiceModalProps) {
    const [title, setTitle] = useState(service?.title || '');
    const [description, setDescription] = useState(service?.description || '');
    const [icon, setIcon] = useState(service?.icon || 'CodeBracketIcon');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = { title, description, icon };
        
        try {
            if (service) {
                // UPDATE
                await axios.put(`${API_URL}/${service.id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // CREATE
                await axios.post(API_URL, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            onSave();
        } catch (err) {
            const message = axios.isAxiosError(err) ? (err.response?.data.message || 'Gagal menyimpan data.') : 'Terjadi kesalahan.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{service ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h2>
                
                {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input Title */}
                    <Input label="Judul Layanan" name="title" value={title} onChange={(e:any) => setTitle(e.target.value)} required />
                    
                    {/* Input Description */}
                    <Textarea label="Deskripsi" name="description" value={description} onChange={(e:any) => setDescription(e.target.value)} required />
                    
                    {/* Input Icon (Bisa diganti dengan select box) */}
                    <Input label="Nama Icon (Misal: CodeBracketIcon)" name="icon" value={icon} onChange={(e:any) => setIcon(e.target.value)} required />

                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition">
                            Batal
                        </button>
                        <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition">
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Komponen Pembantu (Diambil dari manage-profile)
const Input = ({ label, name, value, onChange, type = 'text', required = false }: any) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
);

const Textarea = ({ label, name, value, onChange, required = false }: any) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <textarea
            id={name}
            name={name}
            rows={3}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
);