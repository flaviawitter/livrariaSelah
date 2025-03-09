-- DropIndex
DROP INDEX `Endereco_clienteId_fkey` ON `endereco`;

-- AddForeignKey
ALTER TABLE `endereco` ADD CONSTRAINT `endereco_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
