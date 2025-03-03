const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os pagamentos
const listarPagamentos = async (req, res) => {
    try {
        const pagamentos = await prisma.pagamento.findMany({
            include: {
                pedido: true
            }
        });
        res.json(pagamentos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar pagamentos." });
    }
};

// Buscar pagamento por ID
const buscarPagamentoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pagamento = await prisma.pagamento.findUnique({
            where: { id: Number(id) },
            include: {
                pedido: true
            }
        });
        if (!pagamento) return res.status(404).json({ erro: "Pagamento não encontrado." });
        res.json(pagamento);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o pagamento." });
    }
};

// Criar um novo pagamento
const criarPagamento = async (req, res) => {
    const { pedido_id, data_pagamento, valor, metodo_pagamento, status } = req.body;
    try {
        const novoPagamento = await prisma.pagamento.create({
            data: { 
                pedido_id: Number(pedido_id), 
                data_pagamento: new Date(data_pagamento), 
                valor: Number(valor), 
                metodo_pagamento, 
                status
            }
        });
        res.status(201).json(novoPagamento);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar pagamento." });
    }
};

// Atualizar um pagamento existente
const atualizarPagamento = async (req, res) => {
    const { id } = req.params;
    const { pedido_id, data_pagamento, valor, metodo_pagamento, status } = req.body;
    try {
        const pagamentoAtualizado = await prisma.pagamento.update({
            where: { id: Number(id) },
            data: { 
                pedido_id: Number(pedido_id), 
                data_pagamento: new Date(data_pagamento), 
                valor: Number(valor), 
                metodo_pagamento, 
                status
            }
        });
        res.json(pagamentoAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar pagamento." });
    }
};

// Remover um pagamento
const excluirPagamento = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.pagamento.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Pagamento excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir pagamento." });
    }
};

module.exports = { listarPagamentos, buscarPagamentoPorId, criarPagamento, atualizarPagamento, excluirPagamento };
