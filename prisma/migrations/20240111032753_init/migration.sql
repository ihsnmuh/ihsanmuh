/*
  Warnings:

  - You are about to drop the column `create_at` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `stack` on the `Projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "create_at",
DROP COLUMN "stack",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "stacks" TEXT[],
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Projects_slug_key" ON "Projects"("slug");
