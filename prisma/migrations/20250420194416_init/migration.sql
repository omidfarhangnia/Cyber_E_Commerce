/*
  Warnings:

  - You are about to drop the column `accesslevel` on the `User` table. All the data in the column will be lost.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accesslevel",
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
