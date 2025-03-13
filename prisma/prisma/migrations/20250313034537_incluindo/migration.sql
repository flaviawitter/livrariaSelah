/*
  Warnings:

  - You are about to drop the `bandeiracartao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estados` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `cpf` VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE `endereco` ADD COLUMN `preferencial` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `bandeiracartao`;

-- DropTable
DROP TABLE `cidades`;

-- DropTable
DROP TABLE `estados`;
