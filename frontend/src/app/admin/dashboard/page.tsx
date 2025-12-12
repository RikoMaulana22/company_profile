// frontend/src/app/admin/dashboard/page.tsx
'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    BuildingOfficeIcon, 
    WrenchScrewdriverIcon, 
    ChartBarIcon, 
    ListBulletIcon,
    MagnifyingGlassIcon,
    BellIcon,
    Squares2X2Icon,
    UserGroupIcon,
    Cog6ToothIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import AdminLogoutButton from '@/src/components/Layout/AdminLogoutButton';

// --- Data Mock dengan Styling Aksen Warna seperti gambar ---
const DASHBOARD_STATS = [
    { 
        title: "Total Layanan", 
        value: "3", 
        icon: WrenchScrewdriverIcon, 
        accent: "bg-blue-500", 
        lineColor: "#3b82f6", // Blue
        trend: "+20%"
    },
    { 
        title: "Update Profil", 
        value: "2 Hari", 
        icon: BuildingOfficeIcon, 
        accent: "bg-orange-500", 
        lineColor: "#f97316", // Orange
        trend: "Baru"
    },
    { 
        title: "Visitor", 
        value: "1,245", 
        icon: ChartBarIcon, 
        accent: "bg-emerald-500", 
        lineColor: "#10b981", // Emerald
        trend: "+8%"
    },
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
            <div className="min-h-screen bg-[#111315] flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-gray-400">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#111315] text-gray-100 font-sans">
            
            {/* --- SIDEBAR (Sesuai Gambar Kiri) --- */}
            <aside className="w-64 bg-[#1a1c1e] border-r border-gray-800 hidden md:flex flex-col">
                <div className="p-8 flex items-center justify-center border-b border-gray-800/50">
                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-emerald-900/20">
                        D
                    </div>
                </div>
                
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <SidebarItem icon={Squares2X2Icon} label="Dashboard" active />
                    <SidebarItem icon={BuildingOfficeIcon} label="Company Profile" />
                    <SidebarItem icon={WrenchScrewdriverIcon} label="Services" />
                    <SidebarItem icon={UserGroupIcon} label="Users" />
                    <div className="pt-4 pb-2">
                        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</p>
                    </div>
                    <SidebarItem icon={Cog6ToothIcon} label="Configuration" />
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <p className="text-xs text-center text-gray-600">Digital Solusi Admin v1.0</p>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col overflow-hidden">
                
                {/* HEADER (Sesuai Gambar Atas) */}
                <header className="h-20 bg-[#111315] flex items-center justify-between px-8 border-b border-gray-800/50">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Hello, Admin 👋</h1>
                        <p className="text-sm text-gray-500">Welcome to your dashboard</p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Search Bar Visual */}
                        <div className="relative hidden lg:block">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-[#1a1c1e] border border-gray-700 text-sm rounded-xl pl-10 pr-4 py-2.5 w-64 focus:outline-none focus:border-emerald-500 text-gray-300 placeholder-gray-600"
                            />
                        </div>

                        {/* Notifications & Profile */}
                        <button className="relative p-2 text-gray-400 hover:text-white transition">
                            <BellIcon className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-800">
                            {/* Kita bungkus tombol logout user di dalam styling yang gelap */}
                            <div className="admin-logout-wrapper"> 
                                <AdminLogoutButton />
                            </div>
                        </div>
                    </div>
                </header>

                {/* SCROLLABLE CONTENT */}
                <div className="flex-1 overflow-y-auto p-8">
                    
                    {/* STATS ROW (Sesuai Gambar Tengah) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {DASHBOARD_STATS.map((stat, index) => (
                            <div key={index} className="bg-[#1a1c1e] rounded-2xl p-6 relative overflow-hidden group hover:bg-[#202326] transition-colors border border-gray-800">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg bg-gray-800/50 text-gray-300 group-hover:text-white transition-colors`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">Daily</span>
                                </div>
                                
                                <div className="flex flex-col">
                                    <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                                    <div className="flex items-end justify-between">
                                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                                        <span className="text-xs font-medium text-emerald-400 mb-1">{stat.trend}</span>
                                    </div>
                                </div>

                                {/* Decorative Line / Graph Simulation */}
                                <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${stat.accent}`} style={{ width: '60%' }}></div>
                                </div>
                                
                                {/* Fake Chart SVG Background */}
                                <svg className="absolute right-0 bottom-8 w-24 h-12 opacity-20" viewBox="0 0 100 40">
                                    <path d="M0 30 Q 20 40, 40 20 T 80 20 T 100 10" fill="none" stroke={stat.lineColor} strokeWidth="3" />
                                </svg>
                            </div>
                        ))}
                    </div>

                    {/* ACTION SECTION (Menggantikan Table Candidates di gambar) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Kolom Kiri: Management Buttons (Lebar 2 kolom) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-white">Manajemen Konten</h2>
                                <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 rounded-lg font-medium transition shadow-lg shadow-emerald-900/20">
                                    <PlusIcon className="w-4 h-4" />
                                    Add New
                                </button>
                            </div>

                            <div className="bg-[#1a1c1e] rounded-2xl border border-gray-800 overflow-hidden">
                                <div className="p-6 border-b border-gray-800">
                                    <h3 className="text-sm font-semibold text-gray-300">Quick Actions</h3>
                                </div>
                                <div className="p-4 space-y-3">
                                    {/* Action Row 1 */}
                                    <ActionRow 
                                        title="Profil Perusahaan"
                                        desc="Kelola Visi, Misi & Kontak"
                                        status="Active"
                                        color="text-blue-400"
                                        badge="bg-blue-500/10 border-blue-500/20"
                                        onClick={() => router.push('/admin/manage-profile')}
                                    />
                                    
                                    {/* Action Row 2 */}
                                    <ActionRow 
                                        title="Layanan & Jasa"
                                        desc="Update Daftar Layanan"
                                        status="3 Items"
                                        color="text-orange-400"
                                        badge="bg-orange-500/10 border-orange-500/20"
                                        onClick={() => router.push('/admin/manage-services')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan: Status / Info (Lebar 1 kolom) */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#1a1c1e] rounded-2xl border border-gray-800 p-6 h-full relative overflow-hidden">
                                <h3 className="text-lg font-bold text-white mb-6">System Status</h3>
                                
                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Server Online</p>
                                            <p className="text-xs text-gray-500">Jakarta Region</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <UserGroupIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Admin Access</p>
                                            <p className="text-xs text-gray-500">Super User Logged In</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Calendar Visual Mockup (Opacity rendah) */}
                                <div className="mt-8 pt-8 border-t border-gray-800">
                                     <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-600">
                                        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                                        <span className="text-gray-800">29</span><span className="text-gray-800">30</span><span className="text-white bg-emerald-600 rounded-full w-6 h-6 flex items-center justify-center mx-auto">1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                                     </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

// Helper Components
const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-emerald-600/10 text-emerald-500 border-r-2 border-emerald-500' : 'text-gray-500 hover:text-gray-200 hover:bg-gray-800/50'}`}>
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{label}</span>
    </div>
);

const ActionRow = ({ title, desc, status, color, badge, onClick }: any) => (
    <div 
        onClick={onClick}
        className="flex items-center justify-between p-4 rounded-xl bg-[#202326] border border-gray-800 hover:border-gray-600 cursor-pointer transition-all group"
    >
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${color} bg-gray-800`}>
                {title.charAt(0)}
            </div>
            <div>
                <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{title}</h4>
                <p className="text-xs text-gray-500">{desc}</p>
            </div>
        </div>
        <div className={`px-3 py-1 rounded-md text-xs font-medium border ${badge} ${color}`}>
            {status}
        </div>
    </div>
);
