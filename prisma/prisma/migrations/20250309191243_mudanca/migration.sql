/*
  Warnings:

  - You are about to drop the column `cidadeId` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the column `tipoEnderecoId` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the column `tipoLogradouroId` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the column `tipoResidenciaId` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the column `paisId` on the `estados` table. All the data in the column will be lost.
  - You are about to drop the `pais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoendereco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipologradouro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tiporesidencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipotelefone` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cidade` to the `endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoEndereco` to the `endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoLogradouro` to the `endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoResidencia` to the `endereco` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `carrinho` DROP FOREIGN KEY `Carrinho_livroId_fkey`;

-- DropForeignKey
ALTER TABLE `cartao` DROP FOREIGN KEY `Cartao_bandeiraCartaoId_fkey`;

-- DropForeignKey
ALTER TABLE `cartao` DROP FOREIGN KEY `Cartao_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `cidades` DROP FOREIGN KEY `Cidades_estadoId_fkey`;

-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `Endereco_cidadeId_fkey`;

-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `Endereco_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `Endereco_tipoEnderecoId_fkey`;

-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `Endereco_tipoLogradouroId_fkey`;

-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `Endereco_tipoResidenciaId_fkey`;

-- DropForeignKey
ALTER TABLE `estados` DROP FOREIGN KEY `Estados_paisId_fkey`;

-- DropForeignKey
ALTER TABLE `livros` DROP FOREIGN KEY `Livros_autorId_fkey`;

-- DropForeignKey
ALTER TABLE `livros` DROP FOREIGN KEY `Livros_editoraId_fkey`;

-- DropForeignKey
ALTER TABLE `livros` DROP FOREIGN KEY `Livros_fornecedorId_fkey`;

-- DropForeignKey
ALTER TABLE `livros` DROP FOREIGN KEY `Livros_grupoPrecificacaoId_fkey`;

-- DropForeignKey
ALTER TABLE `livrosativacao` DROP FOREIGN KEY `LivrosAtivacao_livroId_fkey`;

-- DropForeignKey
ALTER TABLE `livrosativacao` DROP FOREIGN KEY `LivrosAtivacao_motivoId_fkey`;

-- DropForeignKey
ALTER TABLE `livroscategorias` DROP FOREIGN KEY `LivrosCategorias_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `livroscategorias` DROP FOREIGN KEY `LivrosCategorias_livroId_fkey`;

-- DropForeignKey
ALTER TABLE `livrosinativacao` DROP FOREIGN KEY `LivrosInativacao_livroId_fkey`;

-- DropForeignKey
ALTER TABLE `livrosinativacao` DROP FOREIGN KEY `LivrosInativacao_motivoId_fkey`;

-- DropForeignKey
ALTER TABLE `telefones` DROP FOREIGN KEY `Telefones_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `telefones` DROP FOREIGN KEY `Telefones_tipoTelefoneId_fkey`;

-- DropIndex
DROP INDEX `Endereco_cidadeId_fkey` ON `endereco`;

-- DropIndex
DROP INDEX `Endereco_clienteId_fkey` ON `endereco`;

-- DropIndex
DROP INDEX `Endereco_tipoEnderecoId_fkey` ON `endereco`;

-- DropIndex
DROP INDEX `Endereco_tipoLogradouroId_fkey` ON `endereco`;

-- DropIndex
DROP INDEX `Endereco_tipoResidenciaId_fkey` ON `endereco`;

-- DropIndex
DROP INDEX `Estados_paisId_fkey` ON `estados`;

-- AlterTable
ALTER TABLE `endereco` DROP COLUMN `cidadeId`,
    DROP COLUMN `tipoEnderecoId`,
    DROP COLUMN `tipoLogradouroId`,
    DROP COLUMN `tipoResidenciaId`,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoEndereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoLogradouro` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoResidencia` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `estados` DROP COLUMN `paisId`;

-- DropTable
DROP TABLE `pais`;

-- DropTable
DROP TABLE `tipoendereco`;

-- DropTable
DROP TABLE `tipologradouro`;

-- DropTable
DROP TABLE `tiporesidencia`;

-- DropTable
DROP TABLE `tipotelefone`;
