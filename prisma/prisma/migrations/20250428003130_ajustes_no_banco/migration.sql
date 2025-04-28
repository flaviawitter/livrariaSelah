/*
  Warnings:

  - Added the required column `clienteId` to the `carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carrinho` ADD COLUMN `clienteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `carrinho` ADD CONSTRAINT `carrinho_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
