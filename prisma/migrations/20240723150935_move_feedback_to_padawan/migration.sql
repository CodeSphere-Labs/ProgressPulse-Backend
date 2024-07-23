/*
  Warnings:

  - The `feedback` column on the `Padawan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `feedback` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Padawan" DROP COLUMN "feedback",
ADD COLUMN     "feedback" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "feedback";
