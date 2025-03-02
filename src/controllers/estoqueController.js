const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os registros de estoque
const listarEstoque = async (req, res) => {
    try {
        const estoque = await prisma.estoque.findMany({
            include: {
                livro: true
            }
        });
        res.json(estoque);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar registros de estoque." });
    }
};

// Buscar registro de estoque por ID
const buscarEstoquePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const estoque = await prisma.estoque.findUnique({
            where: { id: Number(id) },
            include: {
                livro: true
            }
        });
        if (!estoque) return res.status(404).json({ erro: "Registro de estoque não encontrado." });
        res.json(estoque);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o registro de estoque." });
    }
};

// Adicionar um novo registro ao estoque
const adicionarEstoque = async (req, res) => {
    const { livro_id, quantidade, data_entrada } = req.body;
    try {
        const novoEstoque = await prisma.estoque.create({
            data: { 
                livro_id: Number(livro_id), 
                quantidade: Number(quantidade), 
                ultima_atualizacao: new Date(),
                data_entrada: new Date(data_entrada)
            }
        });
        res.status(201).json(novoEstoque);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao adicionar registro ao estoque." });
    }
};

// Atualizar um registro de estoque existente
const atualizarEstoque = async (req, res) => {
    const { id } = req.params;
    const { livro_id, quantidade, data_entrada } = req.body;
    try {
        const estoqueAtualizado = await prisma.estoque.update({
            where: { id: Number(id) },
            data: { 
                livro_id: Number(livro_id), 
                quantidade: Number(quantidade), 
                ultima_atualizacao: new Date(),
                data_entrada: new Date(data_entrada)
            }
        });
        res.json(estoqueAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar registro de estoque." });
    }
};

// Remover um registro de estoque
const excluirEstoque = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.estoque.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Registro de estoque removido com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover registro de estoque." });
    }
};

module.exports = { listarEstoque, buscarEstoquePorId, adicionarEstoque, atualizarEstoque, excluirEstoque };
