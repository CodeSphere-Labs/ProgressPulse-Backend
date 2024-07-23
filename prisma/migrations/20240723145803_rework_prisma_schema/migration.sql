/*
  Warnings:

  - You are about to drop the column `email` on the `Padawan` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Padawan` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Padawan` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Padawan` table. All the data in the column will be lost.
  - You are about to drop the column `patronymic` on the `Padawan` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Padawan` table. All the data in the column will be lost.
  - You are about to drop the `Jedi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Yoda` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Padawan` table without a default value. This is not possible if the table is not empty.
  - Made the column `jediId` on table `Padawan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Padawan" DROP CONSTRAINT "Padawan_jediId_fkey";

-- DropIndex
DROP INDEX "Padawan_email_key";

-- AlterTable
ALTER TABLE "Padawan" DROP COLUMN "email",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "password",
DROP COLUMN "patronymic",
DROP COLUMN "role",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "feedback" SET NOT NULL,
ALTER COLUMN "feedback" DROP DEFAULT,
ALTER COLUMN "feedback" SET DATA TYPE TEXT,
ALTER COLUMN "jediId" SET NOT NULL;

-- DropTable
DROP TABLE "Jedi";

-- DropTable
DROP TABLE "Yoda";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "feedback" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Padawan" ADD CONSTRAINT "Padawan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Padawan" ADD CONSTRAINT "Padawan_jediId_fkey" FOREIGN KEY ("jediId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
