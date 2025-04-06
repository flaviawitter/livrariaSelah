const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os pedidos
const listarPedidos = async (req, res) => {
    try {
        const pedidos = await prisma.pedidos.findMany({
            include: {
                cliente: true,
                id: true,
                dataPedido: true,
                itens: true,            }
        });
        res.json(pedidos);
    } catch (error) {
        console.error("Erro ao buscar pedidos(controller):", erro);
        res.status(500).json({ erro: "Erro ao buscar pedidos." });
    }
};

// Buscar pedido por ID
const buscarPedidoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await prisma.pedidos.findUnique({
            where: { id: Number(id) },
            include: {
                cliente: true
            }
        });
        if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado." });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o pedido." });
    }
};

// Criar um novo pedido
const criarPedido = async (req, res) => {
    console.log("Requisição recebida (pedido):", req.body);

    const { clienteId, dataPedido, totalPreco, status, enderecoId, cartaoId } = req.body;
    try {
        const novoPedido = await prisma.pedidos.create({
            data: { 
                clienteId: Number(clienteId), 
                dataPedido: new Date(dataPedido), 
                totalPreco: Number(totalPreco),
                status,
                enderecoId: Number(enderecoId),
                cartaoId: Number(cartaoId)
            }
        });
        res.status(201).json(novoPedido);
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        res.status(500).json({ erro: "Erro ao criar o pedido." });
    }
};


// Atualizar um pedido existente
const atualizarPedido = async (req, res) => {
    const { id } = req.params;
    const { cliente_id, data_pedido, total_preco, status } = req.body;
    try {
        const pedidoAtualizado = await prisma.pedidos.update({
            where: { id: Number(id) },
            data: { 
                cliente_id: Number(cliente_id), 
                data_pedido: new Date(data_pedido), 
                total_preco: Number(total_preco),
                status
            }
        });
        res.json(pedidoAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar o pedido." });
    }
};

// Excluir um pedido
const excluirPedido = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.pedidos.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Pedido excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir o pedido." });
    }
};

module.exports = { listarPedidos, buscarPedidoPorId, criarPedido, atualizarPedido, excluirPedido };
