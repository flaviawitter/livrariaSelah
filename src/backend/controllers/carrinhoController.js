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
    const { livroId, quantidade, precoUnidade, clienteId } = req.body;

    try {
    const novoItem = await prisma.carrinho.create({
        data: {
        livroId: Number(livroId),
        quantidade: Number(quantidade),
        precoUnidade: precoUnidade, 
        clienteId: Number(clienteId),
        },
    });
    res.status(201).json(novoItem);
    } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    res.status(500).json({ erro: "Erro ao adicionar item ao carrinho.", detalhes: error.message });
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
    const id  = req.params.clienteId;
    try {
        await prisma.carrinho.deleteMany({ where: { clienteId: Number(id) } });
        res.json({ mensagem: "Carrinho excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover item do carrinho." });
    }
};

module.exports = { listarCarrinho, buscarItemCarrinhoPorId, adicionarItemCarrinho, atualizarItemCarrinho, excluirItemCarrinho };
