/*
  Warnings:

  - You are about to drop the column `name` on the `Badges` table. All the data in the column will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostsToTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `badgeName` to the `Badges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostsToTags" DROP CONSTRAINT "_PostsToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostsToTags" DROP CONSTRAINT "_PostsToTags_B_fkey";

-- AlterTable
ALTER TABLE "Badges" DROP COLUMN "name",
ADD COLUMN     "badgeName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "_PostsToTags";
