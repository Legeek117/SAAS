/*
  Warnings:

  - You are about to drop the column `postsPerDayLimit` on the `GlobalSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GlobalSettings" DROP COLUMN "postsPerDayLimit",
ADD COLUMN     "postIntervalUnit" TEXT NOT NULL DEFAULT 'MINUTES',
ADD COLUMN     "postIntervalValue" INTEGER NOT NULL DEFAULT 30;
