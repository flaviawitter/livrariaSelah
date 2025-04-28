/*
  Warnings:

  - Added the required column `valor` to the `cupom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cupom` ADD COLUMN `valor` DECIMAL(65, 30) NOT NULL;
