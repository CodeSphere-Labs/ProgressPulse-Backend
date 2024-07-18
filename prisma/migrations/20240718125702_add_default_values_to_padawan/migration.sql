-- AlterTable
ALTER TABLE "Padawan" ALTER COLUMN "feedback" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "isActive" SET DEFAULT false;
