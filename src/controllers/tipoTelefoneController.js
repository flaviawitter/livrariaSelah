const prisma = require('../config/prismaClient');

async function criarTipoTelefone(req, res) {
    try {
        const tipoTelefone = await prisma.tipoTelefone.create({ data: req.body });
        res.status(201).json(tipoTelefone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarTiposTelefone(req, res) {
    try {
        const tiposTelefone = await prisma.tipoTelefone.findMany();
        res.json(tiposTelefone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterTipoTelefone(req, res) {
    try {
        const tipoTelefone = await prisma.tipoTelefone.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!tipoTelefone) return res.status(404).json({ message: "Tipo de telefone não encontrado" });
        res.json(tipoTelefone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarTipoTelefone(req, res) {
    try {
        const tipoTelefone = await prisma.tipoTelefone.update({ where: { id: parseInt(req.params.id) }, data: req.body });
        res.json(tipoTelefone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarTipoTelefone(req, res) {
    try {
        await prisma.tipoTelefone.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Tipo de telefone deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarTipoTelefone, listarTiposTelefone, obterTipoTelefone, atualizarTipoTelefone, deletarTipoTelefone };
