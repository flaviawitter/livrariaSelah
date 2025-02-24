const prisma = require('../config/prismaClient');

async function criarCartao(req, res) {
    try {
        const cartao = await prisma.cartao.create({ data: req.body });
        res.status(201).json(cartao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarCartoes(req, res) {
    try {
        const cartoes = await prisma.cartao.findMany();
        res.json(cartoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterCartao(req, res) {
    try {
        const cartao = await prisma.cartao.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                bandeiraCartao: {
                    select: { descricao: true }
                }
            }
        });
        if (!cartao) return res.status(404).json({ message: "Cartão não encontrado" });
        res.json(cartao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarCartao(req, res) {
    try {
        const cartao = await prisma.cartao.update({ where: { id: parseInt(req.params.id) }, data: req.body });
        res.json(cartao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarCartao(req, res) {
    try {
        await prisma.cartao.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Cartão deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarCartao, listarCartoes, obterCartao, atualizarCartao, deletarCartao };