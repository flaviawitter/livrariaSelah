/*
  Warnings:

  - Added the required column `validade` to the `cartao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartao` ADD COLUMN `validade` VARCHAR(191) NOT NULL;
