/*
  Warnings:

  - You are about to drop the `Badges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BadgesToGroups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BadgesToGroups" DROP CONSTRAINT "_BadgesToGroups_A_fkey";

-- DropForeignKey
ALTER TABLE "_BadgesToGroups" DROP CONSTRAINT "_BadgesToGroups_B_fkey";

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "badges" TEXT[];

-- DropTable
DROP TABLE "Badges";

-- DropTable
DROP TABLE "_BadgesToGroups";
