/*
  Warnings:

  - You are about to drop the column `cartaoId` on the `pedidos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `pedidos_cartaoId_fkey`;

-- DropIndex
DROP INDEX `pedidos_cartaoId_fkey` ON `pedidos`;

-- AlterTable
ALTER TABLE `pedidos` DROP COLUMN `cartaoId`;

-- CreateTable
CREATE TABLE `pagamentoPedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `cartaoId` INTEGER NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedidoCupom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `cupomId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pagamentoPedido` ADD CONSTRAINT `pagamentoPedido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamentoPedido` ADD CONSTRAINT `pagamentoPedido_cartaoId_fkey` FOREIGN KEY (`cartaoId`) REFERENCES `cartao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedidoCupom` ADD CONSTRAINT `pedidoCupom_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedidoCupom` ADD CONSTRAINT `pedidoCupom_cupomId_fkey` FOREIGN KEY (`cupomId`) REFERENCES `cupom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
