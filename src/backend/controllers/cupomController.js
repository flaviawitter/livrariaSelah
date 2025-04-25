const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os cupons
const listarCupons = async (req, res) => {
    try {
        const cupons = await prisma.cupom.findMany({
            include: {
                cliente: true
            }
        });
        res.json(cupons);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar cupons." });
    }
};

// Buscar cupom por ID
const buscarCupomPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cupom = await prisma.cupom.findUnique({
            where: { id: Number(id) },
            include: {
                cliente: true
            }
        });
        if (!cupom) return res.status(404).json({ erro: "Cupom não encontrado." });
        res.json(cupom);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o cupom." });
    }
};

// Criar um novo cupom
const criarCupom = async (req, res) => {
    const { descricao, clientId, validade } = req.body;
    try {
        const novoCupom = await prisma.cupom.create({
            data: { 
                descricao, 
                clienteId: Number(clientId), 
                validade: validade
            }
        });
        res.status(201).json(novoCupom);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar cupom." });
    } 
};

// Atualizar um cupom existente
const atualizarCupom = async (req, res) => {
    const { id } = req.params;
    const { descricao, cliente_id, validade } = req.body;
    try {
        const cupomAtualizado = await prisma.cupom.update({
            where: { id: Number(id) },
            data: { 
                descricao, 
                cliente_id: Number(cliente_id), 
                validade: new Date(validade)
            }
        });
        res.json(cupomAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar cupom." });
    }
};

// Remover um cupom
const excluirCupom = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cupom.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Cupom excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir cupom." });
    }
};

module.exports = { listarCupons, buscarCupomPorId, criarCupom, atualizarCupom, excluirCupom };
