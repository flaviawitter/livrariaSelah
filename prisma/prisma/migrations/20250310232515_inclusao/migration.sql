/*
  Warnings:

  - Added the required column `estado` to the `endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `endereco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `endereco` ADD COLUMN `estado` VARCHAR(191) NOT NULL,
    ADD COLUMN `pais` VARCHAR(191) NOT NULL;
