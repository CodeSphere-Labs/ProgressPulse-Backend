-- DropForeignKey
ALTER TABLE "Padawan" DROP CONSTRAINT "Padawan_jediId_fkey";

-- AlterTable
ALTER TABLE "Padawan" ALTER COLUMN "jediId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Padawan" ADD CONSTRAINT "Padawan_jediId_fkey" FOREIGN KEY ("jediId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
