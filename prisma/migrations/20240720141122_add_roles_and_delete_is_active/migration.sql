/*
  Warnings:

  - You are about to drop the column `isActive` on the `Jedi` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Padawan` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('YODA', 'JEDI', 'PADAWAN');

-- DropForeignKey
ALTER TABLE "Padawan" DROP CONSTRAINT "Padawan_jediId_fkey";

-- AlterTable
ALTER TABLE "Jedi" DROP COLUMN "isActive",
ADD COLUMN     "role" "Role" DEFAULT 'JEDI';

-- AlterTable
ALTER TABLE "Padawan" DROP COLUMN "isActive",
ADD COLUMN     "role" "Role" DEFAULT 'PADAWAN',
ALTER COLUMN "jediId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Yoda" ADD COLUMN     "role" "Role" DEFAULT 'YODA';

-- AddForeignKey
ALTER TABLE "Padawan" ADD CONSTRAINT "Padawan_jediId_fkey" FOREIGN KEY ("jediId") REFERENCES "Jedi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
