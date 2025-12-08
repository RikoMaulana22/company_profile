// frontend/src/app/admin/dashboard/page.tsx
'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    Cog8ToothIcon, 
    BuildingOfficeIcon, 
    WrenchScrewdriverIcon,
    ChartBarIcon, 
    ListBulletIcon 
} from '@heroicons/react/24/outline';
import AdminLogoutButton from '@/src/components/Layout/AdminLogoutButton'; // Pastikan path ini benar

// Data Mock untuk Statistik Dashboard
const DASHBOARD_STATS = [
    { title: "Jumlah Layanan", value: 3, icon: WrenchScrewdriverIcon, color: "bg-indigo-500" },
    { title: "Profil Diperbarui", value: "2 Hari Lalu", icon: BuildingOfficeIcon, color: "bg-green-500" },
    { title: "Visitor Bulan Ini", value: 1245, icon: ChartBarIcon, color: "bg-yellow-500" },
];

export default function AdminDashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    
    // Pengecekan Autentikasi
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
                <p className="text-xl text-indigo-600">Memverifikasi akses...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-10 border-b pb-4">
                <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
                    <Cog8ToothIcon className="w-8 h-8 mr-3 text-indigo-600" /> Panel Administrasi
                </h1>
                {/* Tombol Logout Cepat */}
                <AdminLogoutButton /> 
            </div>

            {/* --- 1. Statistik Ringkasan --- */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-5">Ringkasan Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {DASHBOARD_STATS.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-600 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.color} text-white`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                    </div>
                ))}
            </div>

            {/* --- 2. Navigasi Cepat (Tombol Aksi) --- */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-5">Manajemen Konten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Tombol ke Manage Profile */}
                <ActionButton 
                    title="Kelola Profil Perusahaan"
                    description="Perbarui informasi inti: Visi, Misi, Kontak, Alamat."
                    icon={BuildingOfficeIcon}
                    onClick={() => router.push('/admin/manage-profile')}
                    color="border-t-4 border-indigo-600 hover:shadow-indigo-200"
                />
                
                {/* Tombol ke Manage Services */}
                <ActionButton 
                    title="Kelola Layanan/Jasa"
                    description="Tambah, edit, atau hapus daftar layanan yang ditawarkan."
                    icon={ListBulletIcon}
                    onClick={() => router.push('/admin/manage-services')}
                    color="border-t-4 border-teal-600 hover:shadow-teal-200"
                />

            </div>
        </div>
    );
}

// Komponen Pembantu untuk Tombol Aksi
interface ActionButtonProps {
    title: string;
    description: string;
    icon: React.ElementType;
    onClick: () => void;
    color: string;
}

const ActionButton = ({ title, description, icon: Icon, onClick, color }: ActionButtonProps) => (
    <div
        onClick={onClick}
        className={`bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:translate-y-[-2px] cursor-pointer ${color}`}
    >
        <div className="flex items-center mb-3">
            <Icon className="w-8 h-8 text-indigo-600 mr-4" />
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
    </div>
);