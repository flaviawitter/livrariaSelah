/*
  Warnings:

  - You are about to drop the column `tipoTelefoneId` on the `telefones` table. All the data in the column will be lost.
  - Added the required column `tipoTelefone` to the `telefones` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Telefones_tipoTelefoneId_fkey` ON `telefones`;

-- AlterTable
ALTER TABLE `telefones` DROP COLUMN `tipoTelefoneId`,
    ADD COLUMN `tipoTelefone` VARCHAR(191) NOT NULL;
