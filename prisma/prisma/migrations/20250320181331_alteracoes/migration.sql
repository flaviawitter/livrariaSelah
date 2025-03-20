/*
  Warnings:

  - Added the required column `categoriaId` to the `livros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estoqueId` to the `livros` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Livros_autorId_fkey` ON `livros`;

-- DropIndex
DROP INDEX `Livros_editoraId_fkey` ON `livros`;

-- DropIndex
DROP INDEX `Livros_fornecedorId_fkey` ON `livros`;

-- DropIndex
DROP INDEX `Livros_grupoPrecificacaoId_fkey` ON `livros`;

-- AlterTable
ALTER TABLE `livros` ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `estoqueId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `autores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_editoraId_fkey` FOREIGN KEY (`editoraId`) REFERENCES `editoras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_grupoPrecificacaoId_fkey` FOREIGN KEY (`grupoPrecificacaoId`) REFERENCES `grupoprecificacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_estoqueId_fkey` FOREIGN KEY (`estoqueId`) REFERENCES `estoque`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
