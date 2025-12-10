// company-profile-app/backend/src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// Fungsi untuk membuat instance PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],

  });
};

// Deklarasi global
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Gunakan instance global jika ada, jika tidak buat baru
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

// Simpan di global saat tidak production (untuk hot-reload)
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
