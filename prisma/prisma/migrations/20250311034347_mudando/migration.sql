/*
  Warnings:

  - Made the column `clienteId` on table `telefones` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Telefones_clienteId_fkey` ON `telefones`;

-- AlterTable
ALTER TABLE `telefones` MODIFY `clienteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `telefones` ADD CONSTRAINT `telefones_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
