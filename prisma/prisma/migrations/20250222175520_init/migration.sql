-- CreateTable
CREATE TABLE `TipoTelefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoTelefone_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ddd` CHAR(3) NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `tipoTelefoneId` INTEGER NOT NULL,
    `clienteId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(64) NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMININO', 'OUTRO') NOT NULL,
    `dataNascimento` DATETIME(3) NULL,
    `statusAtivo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BandeiraCartao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cartao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apelidoCartao` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(19) NOT NULL,
    `nomeTitular` VARCHAR(100) NOT NULL,
    `codSeguranca` VARCHAR(4) NOT NULL,
    `preferencial` BOOLEAN NOT NULL DEFAULT false,
    `clienteId` INTEGER NOT NULL,
    `bandeiraCartaoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `paisId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `estadoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoEndereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoLogradouro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoResidencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(10) NULL,
    `logradouro` VARCHAR(100) NULL,
    `numero` INTEGER NULL,
    `bairro` VARCHAR(50) NULL,
    `clienteId` INTEGER NOT NULL,
    `tipoEnderecoId` INTEGER NOT NULL,
    `tipoLogradouroId` INTEGER NOT NULL,
    `tipoResidenciaId` INTEGER NOT NULL,
    `cidadeId` INTEGER NOT NULL,
    `observacao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entidade` VARCHAR(255) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Telefones` ADD CONSTRAINT `Telefones_tipoTelefoneId_fkey` FOREIGN KEY (`tipoTelefoneId`) REFERENCES `TipoTelefone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telefones` ADD CONSTRAINT `Telefones_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cartao` ADD CONSTRAINT `Cartao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cartao` ADD CONSTRAINT `Cartao_bandeiraCartaoId_fkey` FOREIGN KEY (`bandeiraCartaoId`) REFERENCES `BandeiraCartao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estados` ADD CONSTRAINT `Estados_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `Pais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cidades` ADD CONSTRAINT `Cidades_estadoId_fkey` FOREIGN KEY (`estadoId`) REFERENCES `Estados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_tipoEnderecoId_fkey` FOREIGN KEY (`tipoEnderecoId`) REFERENCES `TipoEndereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_tipoLogradouroId_fkey` FOREIGN KEY (`tipoLogradouroId`) REFERENCES `TipoLogradouro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_tipoResidenciaId_fkey` FOREIGN KEY (`tipoResidenciaId`) REFERENCES `TipoResidencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_cidadeId_fkey` FOREIGN KEY (`cidadeId`) REFERENCES `Cidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
