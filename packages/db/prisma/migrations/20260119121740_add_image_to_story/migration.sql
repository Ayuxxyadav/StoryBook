-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "imageUrl" TEXT,
ADD CONSTRAINT "Story_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Story_id_key";
