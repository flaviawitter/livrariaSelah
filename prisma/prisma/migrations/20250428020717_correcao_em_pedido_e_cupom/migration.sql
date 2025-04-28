/*
  Warnings:

  - You are about to drop the column `cupomId` on the `pedidos` table. All the data in the column will be lost.
  - Added the required column `pedidoId` to the `cupom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `pedidos_cupomId_fkey`;

-- DropIndex
DROP INDEX `pedidos_cupomId_fkey` ON `pedidos`;

-- AlterTable
ALTER TABLE `cupom` ADD COLUMN `pedidoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pedidos` DROP COLUMN `cupomId`;

-- AddForeignKey
ALTER TABLE `cupom` ADD CONSTRAINT `cupom_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
