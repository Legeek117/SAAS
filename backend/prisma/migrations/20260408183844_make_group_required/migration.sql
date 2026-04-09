/*
  Warnings:

  - Made the column `groupId` on table `TwitterAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TwitterAccount" DROP CONSTRAINT "TwitterAccount_groupId_fkey";

-- AlterTable
ALTER TABLE "TwitterAccount" ALTER COLUMN "groupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TwitterAccount" ADD CONSTRAINT "TwitterAccount_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "AccountGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
