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
            tipoEnderecoId: enderecoNovo.tipoEnderecoId,
            tipoLogradouroId: enderecoNovo.tipoLogradouroId,
            tipoResidenciaId: enderecoNovo.tipoResidenciaId,
            cidadeId: enderecoNovo.cidadeId,
            observacao: enderecoNovo.observacao,
        },
    });
}

module.exports = { getTodosEnderecos, getEnderecoPorId, insereEndereco };
