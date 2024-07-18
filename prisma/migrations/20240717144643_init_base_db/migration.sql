-- CreateTable
CREATE TABLE "Yoda" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Yoda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jedi" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Jedi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Padawan" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "feedback" TEXT[],
    "isActive" BOOLEAN NOT NULL,
    "jediId" INTEGER NOT NULL,

    CONSTRAINT "Padawan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Yoda_email_key" ON "Yoda"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Jedi_email_key" ON "Jedi"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Padawan_email_key" ON "Padawan"("email");

-- AddForeignKey
ALTER TABLE "Padawan" ADD CONSTRAINT "Padawan_jediId_fkey" FOREIGN KEY ("jediId") REFERENCES "Jedi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
