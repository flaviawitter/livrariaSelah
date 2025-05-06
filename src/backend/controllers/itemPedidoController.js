const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os itens de pedidos
const listarItensPedido = async (req, res) => {
    try {
        const itens = await prisma.itemPedido.findMany({
            include: {
                pedido: true,
                livro: true
            }
        });
        res.json(itens);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar itens do pedido." });
    }
};

// Buscar item de pedido por ID
const buscarItemPedidoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await prisma.itemPedido.findUnique({
            where: { id: Number(id) },
            include: {
                pedido: true,
                livro: true
            }
        });
        if (!item) return res.status(404).json({ erro: "Item do pedido não encontrado." });
        res.json(item);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o item do pedido." });
    }
};

// Adicionar um novo item ao pedido
const adicionarItemPedido = async (req, res) => {
    console.log("Requisição recebida (itempedido):", req.body);

    const { pedidoId, livroId, quantidade, precoUnidade, status } = req.body;
    try {
        const novoItem = await prisma.itempedido.create({
            data: { 
                pedidoId: Number(pedidoId), 
                livroId: Number(livroId), 
                quantidade: Number(quantidade), 
                precoUnidade: Number(precoUnidade),
                status
            }
        });
        res.status(201).json(novoItem);
    } catch (error) {
        console.error("Erro ao adicionar item ao pedido:", error);
        res.status(500).json({ erro: "Erro ao adicionar item ao pedido." });
    }
};


// Atualizar um item de pedido existente
const atualizarItemPedido = async (req, res) => {
    const { id } = req.params;
    const { pedido_id, livro_id, quantidade, preco_unidade, status } = req.body;
    try {
        const itemAtualizado = await prisma.itempedido.update({
            where: { id: Number(id) },
            data: { 
                status
            }
        });
        res.json(itemAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar item do pedido." });
    }
};

// Remover um item do pedido
const excluirItemPedido = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.itemPedido.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Item do pedido removido com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover item do pedido." });
    }
};

module.exports = { listarItensPedido, buscarItemPedidoPorId, adicionarItemPedido, atualizarItemPedido, excluirItemPedido };
