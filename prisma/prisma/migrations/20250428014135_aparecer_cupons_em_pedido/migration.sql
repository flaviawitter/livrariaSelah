/*
  Warnings:

  - You are about to drop the column `pedidoId` on the `cupom` table. All the data in the column will be lost.
  - Added the required column `cupomId` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cupom` DROP FOREIGN KEY `cupom_pedidoId_fkey`;

-- DropIndex
DROP INDEX `cupom_pedidoId_fkey` ON `cupom`;

-- AlterTable
ALTER TABLE `cupom` DROP COLUMN `pedidoId`;

-- AlterTable
ALTER TABLE `pedidos` ADD COLUMN `cupomId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_cupomId_fkey` FOREIGN KEY (`cupomId`) REFERENCES `cupom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
