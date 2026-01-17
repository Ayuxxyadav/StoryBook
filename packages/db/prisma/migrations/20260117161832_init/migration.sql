/*
  Warnings:

  - A unique constraint covering the columns `[Title]` on the table `Story` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Story_Title_key" ON "Story"("Title");
