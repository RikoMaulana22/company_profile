-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "name" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'admin';
