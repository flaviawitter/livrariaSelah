/*
  Warnings:

  - Made the column `dataNascimento` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `dataNascimento` DATETIME(3) NOT NULL;
