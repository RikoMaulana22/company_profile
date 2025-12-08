// frontend/src/components/ServiceCard.tsx
import React from 'react';
import { Service } from '@/src/app/types/Company';
// Import beberapa ikon untuk mock (Anda perlu menginstal Heroicons/Lucide/dll)
import { CodeBracketIcon, CloudArrowUpIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

interface ServiceCardProps {
    service: Service;
}

// Map nama icon string ke komponen Heroicon yang sebenarnya
const IconMap: { [key: string]: React.ElementType } = {
    CodeBracketIcon,
    CloudArrowUpIcon,
    PaintBrushIcon,
    // Tambahkan ikon lain sesuai kebutuhan
};

export default function ServiceCard({ service }: ServiceCardProps) {
    const IconComponent = IconMap[service.icon] || CodeBracketIcon; // Default icon

    return (
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-500 transform hover:scale-[1.02] border border-gray-100">
            <div className="flex items-center mb-4">
                <div className="p-3 bg-indigo-500 rounded-full text-white">
                    <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">{service.title}</h3>
            </div>
            <p className="text-gray-600">{service.description}</p>
        </div>
    );
}