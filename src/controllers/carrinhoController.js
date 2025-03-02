const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os itens do carrinho
const listarCarrinho = async (req, res) => {
    try {
        const itens = await prisma.carrinho.findMany({
            include: {
                livro: true
            }
        });
        res.json(itens);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar itens do carrinho." });
    }
};

// Buscar item do carrinho por ID
const buscarItemCarrinhoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await prisma.carrinho.findUnique({
            where: { id: Number(id) },
            include: {
                livro: true
            }
        });
        if (!item) return res.status(404).json({ erro: "Item do carrinho não encontrado." });
        res.json(item);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o item do carrinho." });
    }
};

// Adicionar um novo item ao carrinho
const adicionarItemCarrinho = async (req, res) => {
    const { livro_id, quantidade, preco_unidade } = req.body;
    try {
        const novoItem = await prisma.carrinho.create({
            data: { 
                livro_id: Number(livro_id), 
                quantidade: Number(quantidade), 
                preco_unidade: Number(preco_unidade) 
            }
        });
        res.status(201).json(novoItem);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao adicionar item ao carrinho." });
    }
};

// Atualizar a quantidade de um item no carrinho
const atualizarItemCarrinho = async (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;
    try {
        const itemAtualizado = await prisma.carrinho.update({
            where: { id: Number(id) },
            data: { quantidade: Number(quantidade) }
        });
        res.json(itemAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar item do carrinho." });
    }
};

// Remover um item do carrinho
const excluirItemCarrinho = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.carrinho.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Item do carrinho removido com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover item do carrinho." });
    }
};

module.exports = { listarCarrinho, buscarItemCarrinhoPorId, adicionarItemCarrinho, atualizarItemCarrinho, excluirItemCarrinho };
