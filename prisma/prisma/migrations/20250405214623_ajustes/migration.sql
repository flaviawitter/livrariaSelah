-- AddForeignKey
ALTER TABLE `itempedido` ADD CONSTRAINT `itempedido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
