/*
  Warnings:

  - Added the required column `cartaoId` to the `pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enderecoId` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pedidos` ADD COLUMN `cartaoId` INTEGER NOT NULL,
    ADD COLUMN `enderecoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_cartaoId_fkey` FOREIGN KEY (`cartaoId`) REFERENCES `cartao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
