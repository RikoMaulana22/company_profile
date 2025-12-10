// company-profile-app/backend/src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// This function creates a new PrismaClient instance.
// By wrapping it in a function, we can defer the instantiation.
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

// Extend the global `NodeJS` object with a `prisma` property.
// This allows us to store the PrismaClient instance globally.
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Use the existing global instance if it exists, otherwise create a new one.
// The nullish coalescing operator (??) ensures a new instance is created only if `globalThis.prisma` is null or undefined.
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

// In non-production environments, store the created instance on the global object.
// This prevents creating a new client on every hot-reload.
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;