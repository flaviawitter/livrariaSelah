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
    `ranking` INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE `Autores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `dataNascimento` DATETIME(3) NULL,
    `nacionalidade` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Editoras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NULL,
    `anoFundacao` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categorias_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `autorId` INTEGER NOT NULL,
    `editoraId` INTEGER NOT NULL,
    `fornecedorId` INTEGER NOT NULL,
    `ano` INTEGER NULL,
    `edicao` VARCHAR(191) NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `precoCusto` DECIMAL(65, 30) NOT NULL,
    `precoVenda` DECIMAL(65, 30) NOT NULL,
    `dataPublicacao` DATETIME(3) NULL,
    `paginas` INTEGER NULL,
    `sinopse` VARCHAR(191) NULL,
    `quantidadeEstoque` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL,
    `altura` DECIMAL(65, 30) NOT NULL,
    `largura` DECIMAL(65, 30) NOT NULL,
    `peso` DECIMAL(65, 30) NOT NULL,
    `profundidade` DECIMAL(65, 30) NOT NULL,
    `grupoPrecificacaoId` INTEGER NOT NULL,
    `codigoBarras` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Livros_isbn_key`(`isbn`),
    UNIQUE INDEX `Livros_codigoBarras_key`(`codigoBarras`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LivrosCategorias` (
    `livroId` INTEGER NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`livroId`, `categoriaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GrupoPrecificacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `margemLucro` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MotivoInativacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MotivoAtivacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LivrosInativacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `livroId` INTEGER NOT NULL,
    `motivoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LivrosAtivacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `livroId` INTEGER NOT NULL,
    `motivoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrinho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `livroId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `precoUnidade` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `dataPedido` DATETIME(3) NULL,
    `totalPreco` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemPedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `livroId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `precoUnidade` DECIMAL(65, 30) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fornecedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estoque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `livroId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 0,
    `ultimaAtualizacao` DATETIME(3) NULL,
    `dataEntrada` DATETIME(3) NULL,

    UNIQUE INDEX `Estoque_livroId_key`(`livroId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `dataPagamento` DATETIME(3) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `metodoPagamento` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cupom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `validade` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Frete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `enderecoId` INTEGER NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassificacaoIA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `livroId` INTEGER NOT NULL,
    `clienteId` INTEGER NOT NULL,

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

-- AddForeignKey
ALTER TABLE `Livros` ADD CONSTRAINT `Livros_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `Autores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livros` ADD CONSTRAINT `Livros_editoraId_fkey` FOREIGN KEY (`editoraId`) REFERENCES `Editoras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livros` ADD CONSTRAINT `Livros_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `Fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livros` ADD CONSTRAINT `Livros_grupoPrecificacaoId_fkey` FOREIGN KEY (`grupoPrecificacaoId`) REFERENCES `GrupoPrecificacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LivrosCategorias` ADD CONSTRAINT `LivrosCategorias_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LivrosCategorias` ADD CONSTRAINT `LivrosCategorias_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LivrosInativacao` ADD CONSTRAINT `LivrosInativacao_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LivrosInativacao` ADD CONSTRAINT `LivrosInativacao_motivoId_fkey` FOREIGN KEY (`motivoId`) REFERENCES `MotivoInativacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LivrosAtivacao` ADD CONSTRAINT `LivrosAtivacao_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LivrosAtivacao` ADD CONSTRAINT `LivrosAtivacao_motivoId_fkey` FOREIGN KEY (`motivoId`) REFERENCES `MotivoAtivacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
