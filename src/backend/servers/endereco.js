const prisma = require('../config/prismaClient');

// Busca todos os endereços no banco
async function getTodosEnderecos() {
    return await prisma.endereco.findMany();
}

// Busca um endereço pelo ID
async function getEnderecoPorId(id) {
    return await prisma.endereco.findUnique({
        where: { id: parseInt(id) },
    });
}

// Insere um novo endereço no banco
async function insereEndereco(enderecoNovo) {
    // Certifique-se de que o objeto de entrada corresponda à tabela Endereco no banco de dados
    return await prisma.endereco.create({
        data: {
            cep: enderecoNovo.cep,
            logradouro: enderecoNovo.logradouro,
            numero: enderecoNovo.numero,
            bairro: enderecoNovo.bairro,
            clienteId: enderecoNovo.clienteId,
            tipoEndereco: enderecoNovo.tipoEndereco,
            tipoLogradouro: enderecoNovo.tipoLogradouro,
            tipoResidencia: enderecoNovo.tipoResidencia,
            cidade: enderecoNovo.cidade,
            observacao: enderecoNovo.observacao,
        },
    });
}

module.exports = { getTodosEnderecos, getEnderecoPorId, insereEndereco };
