-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `pedidos_cupomId_fkey`;

-- DropIndex
DROP INDEX `pedidos_cupomId_fkey` ON `pedidos`;

-- AlterTable
ALTER TABLE `pedidos` MODIFY `cupomId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_cupomId_fkey` FOREIGN KEY (`cupomId`) REFERENCES `cupom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
