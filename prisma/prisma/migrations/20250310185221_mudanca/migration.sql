/*
  Warnings:

  - You are about to drop the column `bandeiraCartaoId` on the `cartao` table. All the data in the column will be lost.
  - Added the required column `bandeiraCartao` to the `cartao` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Cartao_bandeiraCartaoId_fkey` ON `cartao`;

-- DropIndex
DROP INDEX `Cartao_clienteId_fkey` ON `cartao`;

-- AlterTable
ALTER TABLE `cartao` DROP COLUMN `bandeiraCartaoId`,
    ADD COLUMN `bandeiraCartao` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `cartao` ADD CONSTRAINT `cartao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
