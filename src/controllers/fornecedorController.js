const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os fornecedores
const listarFornecedores = async (req, res) => {
    try {
        const fornecedores = await prisma.fornecedor.findMany();
        res.json(fornecedores);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar fornecedores." });
    }
};

// Buscar fornecedor por ID
const buscarFornecedorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const fornecedor = await prisma.fornecedor.findUnique({
            where: { id: Number(id) }
        });
        if (!fornecedor) return res.status(404).json({ erro: "Fornecedor não encontrado." });
        res.json(fornecedor);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o fornecedor." });
    }
};

// Criar um novo fornecedor
const criarFornecedor = async (req, res) => {
    const { nome } = req.body;
    try {
        const novoFornecedor = await prisma.fornecedor.create({
            data: { nome }
        });
        res.status(201).json(novoFornecedor);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar o fornecedor." });
    }
};

// Atualizar um fornecedor existente
const atualizarFornecedor = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const fornecedorAtualizado = await prisma.fornecedor.update({
            where: { id: Number(id) },
            data: { nome }
        });
        res.json(fornecedorAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar o fornecedor." });
    }
};

// Excluir um fornecedor
const excluirFornecedor = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.fornecedor.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Fornecedor excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir o fornecedor." });
    }
};

module.exports = { listarFornecedores, buscarFornecedorPorId, criarFornecedor, atualizarFornecedor, excluirFornecedor };
