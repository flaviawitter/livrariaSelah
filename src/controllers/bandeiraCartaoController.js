const prisma = require('../config/prismaClient');

async function criarBandeiraCartao(req, res) {
    try {
        const bandeiraCartao = await prisma.bandeiraCartao.create({ data: req.body });
        res.status(201).json(bandeiraCartao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarBandeirasCartao(req, res) {
    try {
        const bandeirasCartao = await prisma.bandeiraCartao.findMany();
        res.json(bandeirasCartao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterBandeiraCartao(req, res) {
    try {
        const bandeiraCartao = await prisma.bandeiraCartao.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!bandeiraCartao) return res.status(404).json({ message: "Bandeira de cartão não encontrada" });
        res.json(bandeiraCartao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarBandeiraCartao(req, res) {
    try {
        const bandeiraCartao = await prisma.bandeiraCartao.update({ where: { id: parseInt(req.params.id) }, data: req.body });
        res.json(bandeiraCartao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarBandeiraCartao(req, res) {
    try {
        await prisma.bandeiraCartao.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Bandeira de cartão deletada com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarBandeiraCartao, listarBandeirasCartao, obterBandeiraCartao, atualizarBandeiraCartao, deletarBandeiraCartao };
