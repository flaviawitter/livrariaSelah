const { PrismaClient } = require('@prisma/client');
const { logDOM } = require('@testing-library/react');
const prisma = new PrismaClient();

// Listar todos os pedidos
const listarPedidos = async (req, res) => {
    try {
        const pedidos = await prisma.pedidos.findMany({
            include: {
                itens: true,
                endereco: true,
                pagamentos: true,
                cupons: true,
                cliente: true,
                cupom: true
              }
              
        });
        res.json(pedidos);
    } catch (error) {
        console.error("Erro ao buscar pedidos(controller):", error);
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

const criarPedido = async (req, res) => {
    console.log("Requisição recebida (pedido):", req.body);

    const { clienteId, dataPedido, totalPreco, status, enderecoId, pagamentosCartoes } = req.body;

    try {
        const novoPedido = await prisma.pedidos.create({
  
            data: { 
                clienteId, 
                dataPedido: new Date(dataPedido), 
                totalPreco,
                status,
                enderecoId
            }
        });

        // Criar os registros na tabela pagamentoPedido
        const pagamentos = Object.entries(pagamentosCartoes).map(([cartaoId, valor]) => ({
            pedidoId: novoPedido.id,
            cartaoId: Number(cartaoId),
            valor: parseFloat(valor)
        }));

        await prisma.pagamentoPedido.createMany({
            data: pagamentos
        });

        res.status(201).json(novoPedido);
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        res.status(500).json({ erro: "Erro ao criar o pedido." });
    }
};


const atualizarPedido = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ erro: "ID ou status ausente" });
    }

    try {
        const pedidoAtualizado = await prisma.pedidos.update({
            where: { id: Number(id) },
            data: { status },
        });

        res.json(pedidoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar pedido:", error);
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

const listarPedidosPorCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const pedidos = await prisma.pedidos.findMany({
            where: {
                clienteId: Number(id)
            },
            include: {
                itens: true
            }
        });
        res.json(pedidos);
    } catch (error) {
        console.error("Erro ao buscar pedidos do cliente:", error);
        res.status(500).json({ erro: "Erro ao buscar pedidos do cliente." });
    }
};

module.exports = { listarPedidos, buscarPedidoPorId, criarPedido, atualizarPedido, excluirPedido, listarPedidosPorCliente };
