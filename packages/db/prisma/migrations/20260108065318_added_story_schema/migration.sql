-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT,
    "Content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Story_id_key" ON "Story"("id");

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
