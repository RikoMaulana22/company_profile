// frontend/src/components/Layout/AdminLogoutButton.tsx
'use client'; 
// Harus Client Component karena menggunakan localStorage, useRouter, dan event onClick.

import { useRouter } from 'next/navigation';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

export default function AdminLogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        // Hapus token autentikasi yang disimpan
        if (typeof window !== 'undefined') {
            localStorage.removeItem('adminToken');
        }
        
        // Arahkan pengguna ke halaman login
        // Penggunaan replace memastikan halaman login tidak bisa di-back
        router.replace('/admin/login'); 
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800 transition duration-300 font-medium ml-4 px-3 py-1 border border-red-300 rounded-lg hover:bg-red-50"
            title="Keluar dari Panel Admin"
        >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-1" /> Logout
        </button>
    );
}