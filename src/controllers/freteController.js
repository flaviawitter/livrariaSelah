const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os fretes
const listarFretes = async (req, res) => {
    try {
        const fretes = await prisma.frete.findMany({
            include: {
                pedido: true,
                endereco: true
            }
        });
        res.json(fretes);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar fretes." });
    }
};

// Buscar frete por ID
const buscarFretePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const frete = await prisma.frete.findUnique({
            where: { id: Number(id) },
            include: {
                pedido: true,
                endereco: true
            }
        });
        if (!frete) return res.status(404).json({ erro: "Frete não encontrado." });
        res.json(frete);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o frete." });
    }
};

// Criar um novo frete
const criarFrete = async (req, res) => {
    const { pedido_id, endereco_id, valor } = req.body;
    try {
        const novoFrete = await prisma.frete.create({
            data: { 
                pedido_id: Number(pedido_id), 
                endereco_id: Number(endereco_id), 
                valor: Number(valor)
            }
        });
        res.status(201).json(novoFrete);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar frete." });
    }
};

// Atualizar um frete existente
const atualizarFrete = async (req, res) => {
    const { id } = req.params;
    const { pedido_id, endereco_id, valor } = req.body;
    try {
        const freteAtualizado = await prisma.frete.update({
            where: { id: Number(id) },
            data: { 
                pedido_id: Number(pedido_id), 
                endereco_id: Number(endereco_id), 
                valor: Number(valor)
            }
        });
        res.json(freteAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar frete." });
    }
};

// Remover um frete
const excluirFrete = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.frete.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Frete excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir frete." });
    }
};

module.exports = { listarFretes, buscarFretePorId, criarFrete, atualizarFrete, excluirFrete };
