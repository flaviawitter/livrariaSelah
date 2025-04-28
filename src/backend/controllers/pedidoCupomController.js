const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const criarPedidoCupom = async (req, res) => {
    const { pedidoId, cupomId } = req.body;

    try {
        const novoPedidoCupom = await prisma.pedidoCupom.create({
            data: {
                pedidoId: Number(pedidoId),
                cupomId: Number(cupomId)
            }
        });
        res.status(201).json(novoPedidoCupom);
    } catch (error) {
        console.error("Erro ao criar pedidoCupom:", error);
        res.status(500).json({ erro: "Erro ao criar pedido-cupom." });
    }
};

module.exports = {
    criarPedidoCupom,
};
