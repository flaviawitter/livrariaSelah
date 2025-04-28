/*
  Warnings:

  - Added the required column `pedidoId` to the `cupom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cupom` ADD COLUMN `pedidoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `cupom` ADD CONSTRAINT `cupom_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
